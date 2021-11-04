import strip from '../utils/strip';
import _find from 'lodash/fp/find';

const showElement = (element) => {
    element.classList.add('visible');
    element.classList.remove('invisible');
};

const hideElement = (element) => {
    element.classList.remove('visible');
    element.classList.add('invisible');
};

const showHideElements = (status, type) => {
    const solution = document.querySelector('.part__solution');
    const extra = document.querySelector('.part__assignments-extra');
    if (status) {
        if (type === 'basic' && extra) showElement(extra);
        if (solution) {
            showElement(solution);
        }
    } else {
        if (type === 'basic') {
            if (extra) hideElement(extra);
            if (solution) {
                hideElement(solution);
            }
        }
    }
};

const format = (str) => [str.slice(0, -1), ' ', str.slice(-1)].join('');

const createLabel = (text) => {
    const label = document.createElement('label');
    label.classList.add('visually-hidden');
    label.setAttribute('for', text);
    label.textContent = `Jag är klar med ${format(text)}`;
    return label;
};

const createCheckbox = (element, id, checked) => {
    const input = document.createElement('input');
    input.classList.add('checkbox');
    input.type = 'checkbox';
    input.name = id;
    input.id = id;
    input.checked = checked || false;
    const label = createLabel(id);
    element.appendChild(label);
    element.appendChild(input);
    return input;
};

const setupAssignments = (element, storage, tod) => {
    let status = storage.find(...tod);
    showHideElements(storage.checkCompleted(status, 'basic'), 'basic');
    const assignmentsElements = element.querySelectorAll('h4');
    assignmentsElements.forEach((element) => {
        let result = _find(
            ['name', strip(element.textContent)],
            status.assignments
        );
        const box = createCheckbox(element, result.name, result.completed);
        box.addEventListener('change', () => {
            storage.updateAssignment(...tod, result);
            showHideElements(
                storage.checkCompleted(status, result.type),
                result.type
            );
        });
    });
};

export { setupAssignments };
