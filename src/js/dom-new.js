import confetti from 'canvas-confetti';

import starSvg from '../assets/icons/grade_FILL1_wght400_GRAD0_opsz24.svg';
import { getAssignmentType, numberOfAssignments } from './data-utils';
import { restore, strip } from './strip';

const setupAssignments = (tod, storage) => {
    const element = document.querySelector('.part__assignments');
    if (!element) return;
    const assignmentData = numberOfAssignments(storage, tod);
    if (assignmentData.total === 0) return;

    console.log(assignmentData);

    showHideElements(assignmentData);

    const assignmentsElements = element.querySelectorAll('h4');
    for (const element of assignmentsElements) {
        let result = storage.getAssignment(...tod, strip(element.textContent));

        if (!result) {
            const type = getAssignmentType(
                storage.data,
                tod,
                strip(element.textContent)
            );
            result = storage.addAssignment(
                ...tod,
                strip(element.textContent),
                type
            );
        }

        const box = createCheckbox(
            element,
            result.assignment,
            result.completed
        );

        box.addEventListener('change', () => {
            if (confetti && box.checked) {
                confetti();
            }
            storage.updateAssignment(...tod, result.assignment);
            showHideElements(numberOfAssignments(storage, tod));
        });
    }
};

const showElement = (element) => {
    element.classList.remove('invisible');
};

const hideElement = (element) => {
    element.classList.add('invisible');
};

const showHideElements = (status) => {
    const solution = document.querySelector('.part__solution');
    const extra = document.querySelector('.part__assignments-extra');
    if (status) {
        if (status.basic.total === status.basic.completed && extra) {
            showElement(extra);
            if (solution) {
                showElement(solution);
            }
        } else {
            if (extra) {
                hideElement(extra);
            }
            if (solution) {
                hideElement(solution);
            }
        }
    }
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

const format = (str) => [str.slice(0, -1), ' ', str.slice(-1)].join('');

const createLabel = (text) => {
    const label = document.createElement('label');
    label.classList.add('visually-hidden');
    label.setAttribute('for', text);
    label.textContent = `Jag är klar med ${format(text)}`;
    return label;
};

export { setupAssignments };
