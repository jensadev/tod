import strip from '../utils/strip';

const showElement = (element) => {
    element.classList.remove('invisible');
};

const hideElement = (element) => {
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
    } else if (type === 'basic') {
        if (extra) hideElement(extra);
        if (solution) {
            hideElement(solution);
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
    if (!element) return;
    const input = document.createElement('input');
    input.classList.add('checkbox');
    input.type = 'checkbox';
    input.name = id;
    input.id = id;
    input.checked = checked || false;
    const label = createLabel(id);
    element.classList.add('part__assignments-header');
    element.appendChild(label);
    element.appendChild(input);
    return input;
};

const setupAssignments = (element, storage, tod) => {
    if (!element) return;
    let status = storage.find(...tod);
    showHideElements(storage.checkCompleted(status, 'basic'), 'basic');
    const assignmentsElements = element.querySelectorAll('h4');
    assignmentsElements.forEach((element) => {
        const result = status.assignments.find(
            ({ assignment }) => assignment === strip(element.textContent)
        );
        const box = createCheckbox(element, result.assignment, result.completed);
        box.addEventListener('change', () => {
            storage.updateAssignment(...tod, result);
            showHideElements(
                storage.checkCompleted(status, result.type),
                result.type
            );
        });
    });
};

const createStars = (element, type = 'basic') => {
    if (!element) return;
    const el = document.createElement('span');
    el.classList.add('stars');
    if (type === 'basic') {
        el.textContent = '⭐';
    } else {
        el.textContent = '⭐⭐';
    }
    element.appendChild(el);
}

const createProgressBar = (element, total = 0, completed = 0) => {
    if (!element) return;
    const width = 100 / total;
    const segmentWidth = total != 0 ? (width) : 0; 
    const progress = document.createElement('div');
    progress.classList.add('progress');
    const bar = document.createElement('div');
    bar.classList.add('progress__bar');
    bar.classList.add('bg-theme');
    bar.setAttribute('style', `width: ${segmentWidth * completed}%`);
    progress.appendChild(bar);
    element.parentElement.insertAdjacentElement('beforeend', progress);
};

export { setupAssignments, createStars, createProgressBar };
