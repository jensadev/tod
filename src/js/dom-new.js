import confetti from 'canvas-confetti';

import starSvg from '../assets/icons/grade_FILL1_wght400_GRAD0_opsz24.svg';
import { restore, strip } from './strip';

const setupAssignments = (tod, storage) => {
    const element = document.querySelector('.part__assignments');
    if (!element) return;
    // showHideElements(storage.checkCompleted(status, 'basic'), 'basic');
    // const status = storage.find(...tod);
    const assignmentsElements = element.querySelectorAll('h4');
    for (const element of assignmentsElements) {
        console.log(element);
        // const result = storage.find(...tod, strip(element.textContent));
        let result = storage.getAssignment(...tod, strip(element.textContent));

        if (!result) {
            result = storage.addAssignment(...tod, strip(element.textContent));
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
            // showHideElements(
            //     storage.checkCompleted(status, result.type),
            //     result.type
            // );
        });
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
