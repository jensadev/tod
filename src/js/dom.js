import confetti from 'canvas-confetti';

import starSvg from '../assets/icons/grade_FILL1_wght400_GRAD0_opsz24.svg';
import { restore, strip } from './strip';

const setupAssignments = (storage, theme, area, part) => {
    const element = document.querySelector('.part__assignments');
    if (!element) return;

    const assignments = storage.getAssignments(theme, area, part);

    showHideElements(storage.assignmentsStatus(theme, area, part));

    if (assignments) {
        const assignmentElements = element.querySelectorAll('h4');
        for (const assignment of assignments) {
            const title = restore(assignment.assignment);
            let el = [...assignmentElements].find((el) => {
                return el.textContent === title;
            });
            let storedAssignment = storage.findAssignmentByID(assignment.id);
            if (storedAssignment === false) {
                storedAssignment = storage.createAssignment(
                    assignment.id,
                    assignment.type
                );
            }
            const box = createCheckbox(el, title, storedAssignment.completed);
            box.addEventListener('change', () => {
                if (confetti && box.checked) {
                    confetti();
                }
                storage.updateAssignment(assignment.id);
                showHideElements(storage.assignmentsStatus(theme, area, part));
            });
        }
    }
};

const showElement = (element) => {
    element.classList.remove('invisible');
};

const hideElement = (element) => {
    element.classList.add('invisible');
};

const showHideElements = (status) => {
    if (!status) return;
    const solution = document.querySelector('.part__solution');
    const extra = document.querySelector('.part__assignments-extra > div');
    if (status.basic.total === status.basic.completed) {
        if (extra) {
            showElement(extra);
        }
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
};

const showHideTests = (elements, storage) => {
    if (!elements) return;
    for (const element of elements) {
        let result;
        if (element.tagName === 'DIV') {
            result = element.querySelector('.stretched-link');
        } else {
            const a = element.querySelector('a');
            result = a ? a : element;
        }
        const areaTitle = strip(result.textContent).replace('slutuppgift-', '');
        const checkArea = storage.areaStatus(strip(areaTitle));
        if (checkArea.finished) {
            showElement(element);
        } else {
            hideElement(element);
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
    input.name = strip(id);
    input.id = strip(id);
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

const createLabel = (text) => {
    console.log(text);
    const label = document.createElement('label');
    label.classList.add('visually-hidden');
    label.setAttribute('for', strip(text));
    label.textContent = `Jag är klar med ${text.replace(/-/g, ' ')}`;
    return label;
};

export {
    createProgressBar,
    createStars,
    setupAssignments,
    showHideTests,
};
