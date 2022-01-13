import { restore, strip } from './strip';

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
    const status = storage.find(...tod);
    showHideElements(storage.checkCompleted(status, 'basic'), 'basic');
    const assignmentsElements = element.querySelectorAll('h4');
    assignmentsElements.forEach((element) => {
        const result = status.assignments.find(
            ({ assignment }) => assignment === strip(element.textContent)
        );
        const box = createCheckbox(
            element,
            result.assignment,
            result.completed
        );
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
};

const createProgressBar = (element, total = 0, completed = 0, grid) => {
    if (!element) return;
    const width = 100 / total;
    const segmentWidth = total != 0 ? width : 0;
    const progress = document.createElement('div');
    progress.classList.add('progress');
    if (grid) {
        progress.classList.add('progress--grid');
    }
    const bar = document.createElement('div');
    bar.classList.add('progress__bar');
    bar.classList.add('bg-theme');
    bar.setAttribute('style', `width: ${segmentWidth * completed}%`);
    progress.appendChild(bar);
    element.parentElement.insertAdjacentElement('beforeend', progress);
};

const createProgressSvg = (element, total = 0, completed = 0) => {
    if (!element) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('width', '100');
    svg.setAttribute('height', '100');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1.5 1.5 l97 0l0 97l-97 0 l0 -97');

    svg.appendChild(path);
    const borderLength = path.getTotalLength() + 5;
    path.style.strokeDashoffset = borderLength;
    path.style.strokeDasharray = `${borderLength}, ${borderLength}`;

    const totalWidth = 100 / total;
    const segmentWidth = total != 0 ? totalWidth : 0;
    const offset = ((segmentWidth * completed) / 100) * borderLength;
    path.style.strokeDashoffset = borderLength - offset;
    element.appendChild(svg);
};

const showHideTests = (elements, storage) => {
    if (!elements) return;
    elements.forEach((element) => {
        let result;
        if (element.tagName === 'DIV') {
            result = element.querySelector('.stretched-link');
        } else {
            const a = element.querySelector('a');
            result = a ? a : element;
        }
        const areaTitle = strip(result.textContent).replace('slutuppgift-', '');
        const checkArea = storage.checkArea(areaTitle);
        if (checkArea) {
            showElement(element);
        } else {
            hideElement(element);
        }
    });
};

const popupItem = (element, text, href) => {
    if (!element) return;
    const link = element.querySelector('a');
    if (link) {
        link.textContent = restore(text);
        link.href = href;
    }
};

const continuePopup = (element, check, last) => {
    if (element) {
        if (check) {
            element.classList.add('invisible');
        }
        const close = element.querySelector('.button__close');
        close.addEventListener('click', () => {
            const now = Date.now();
            localStorage.setItem('continue', now);
            element.classList.add('invisible');
        });
        const list = element.querySelectorAll('li');
        popupItem(list[0], last.theme, `/${last.theme}`);
        popupItem(list[1], last.area, `/${last.theme}/${last.area}/`);
        popupItem(
            list[2],
            last.part,
            `/${last.theme}/${last.area}/${last.part}/`
        );
    }
    const continueButton = document.querySelector('.continue__button');
    if (continueButton) {
        continueButton.href = `/${last.theme}/${last.area}/${last.part}/`;
        continueButton.addEventListener('click', () => {
            const now = Date.now();
            localStorage.setItem('continue', now);
        });
    }
};

export {
    continuePopup,
    createProgressBar,
    createProgressSvg,
    createStars,
    setupAssignments,
    showHideTests,
};
