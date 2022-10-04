import confetti from 'canvas-confetti';

import starSvg from '../assets/icons/grade_FILL1_wght400_GRAD0_opsz24.svg';
import { hash } from './hash.js';
import { restore, strip } from './strip';

const setupAssignments = (storage, theme, area, part) => {
    const element = document.querySelector('.part__assignments');
    if (!element) return;

    const assignments = storage.getAssignments(theme, area, part);

    // console.log('assignments', assignments);

    if (assignments) {
        const assignmentElements = element.querySelectorAll('h4');
        for (const assignment of assignments) {
            const title = restore(assignment.assignment);
            let el = [...assignmentElements].find((el) => {
                return el.textContent === title;
            });

            console.log(assignment);

            console.log(el);

            const id = hash(theme + area + part + assignment.assignment);
            console.log(id);
            let storedAssignment = storage.findByID(id);
            console.log(storedAssignment);
            if (storedAssignment === false) {
                storedAssignment = storage.addAssignment(id, assignment.type);
            }

            const box = createCheckbox(el, title, storedAssignment.completed);
            box.addEventListener('change', () => {
                if (confetti && box.checked) {
                    confetti();
                }
                storage.updateAssignment(id);
                // showHideElements(numberOfAssignments(storage, tod));
            });
        }
    }

    // const assignmentData = numberOfAssignments(storage, tod);
    // if (assignmentData.total === 0) return;

    // console.log(assignmentData);

    // showHideElements(assignmentData);

    // const assignmentsElements = element.querySelectorAll('h4');
    // for (const element of assignmentsElements) {
    //     /* todo: fix this :)
    //      * assignments need to be read from json
    //      * then a check needs to be done if we got completed data for it' id
    //      * we can do proceed to create the checkbox and progress bar unt so weiter
    //      */

    //     let result = storage.getAssignment(...tod, strip(element.textContent));

    //     if (!result) {
    //         const type = getAssignmentType(
    //             storage.data,
    //             tod,
    //             strip(element.textContent)
    //         );
    //         result = storage.addAssignment(
    //             ...tod,
    //             strip(element.textContent),
    //             type
    //         );
    //     }

    //     const box = createCheckbox(
    //         element,
    //         result.assignment,
    //         result.completed
    //     );

    //     box.addEventListener('change', () => {
    //         if (confetti && box.checked) {
    //             confetti();
    //         }
    //         storage.updateAssignment(...tod, result.assignment);
    //         showHideElements(numberOfAssignments(storage, tod));
    //     });
    // }
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

const createStars = (element, type = 'basic') => {
    if (!element) return;
    const el = document.createElement('span');
    el.classList.add('stars');
    // el.textContent = type === 'basic' ? `${starSvg}` : `${starSvg} ${starSvg}`;
    if (type === 'basic') {
        el.appendChild(starSvg());
    } else {
        el.appendChild(starSvg());
        el.appendChild(starSvg());
    }
    element.appendChild(el);
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

const createProgressBar = (element, total = 0, completed = 0) => {
    if (!element) return;
    const width = 100 / total;
    const segmentWidth = total != 0 ? width : 0;
    const progress = document.createElement('div');
    progress.classList.add('progress');
    const bar = document.createElement('div');
    bar.classList.add('progress__bar');
    bar.classList.add('bg-theme');
    bar.setAttribute('style', `width: ${segmentWidth * completed}%`);
    if (element.tagName === 'H2') {
        bar.classList.add('bg-theme--top');
    }
    progress.appendChild(bar);
    element.parentElement.insertAdjacentElement('beforeend', progress);
};

const format = (str) => [str.slice(0, -1), '-', str.slice(-1)].join('');

const createLabel = (text) => {
    const label = document.createElement('label');
    label.classList.add('visually-hidden');
    label.setAttribute('for', text);
    label.textContent = `Jag är klar med ${text.replace(/-/g, ' ')}`;
    return label;
};

export { createProgressBar, createStars, setupAssignments };
