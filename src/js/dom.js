import confetti from 'canvas-confetti';

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
            if (confetti && box.checked) {
                confetti();
            }
            storage.updateAssignment(...tod, result);
            showHideElements(
                storage.checkCompleted(status, result.type),
                result.type
            );
        });
    });
};

const createStar = (element) => {
    if (!element) return;
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.classList.add('star');
    star.setAttribute('viewBox', '0 0 24 24');
    star.setAttribute('width', '16px');
    star.setAttribute('height', '16px');
    star.setAttribute('fill', 'currentColor');
    star.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M0,0h24v24H0V0z');
    path.setAttribute('fill', 'none');
    g.appendChild(path);
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M0,0h24v24H0V0z');
    path.setAttribute('fill', 'none');
    g.appendChild(path);
    star.appendChild(g);
    g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
        'd',
        'M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z'
    );
    g.appendChild(path);
    star.appendChild(g);
    element.appendChild(star);
};

const createStars = (element, type = 'basic') => {
    if (!element) return;
    const el = document.createElement('span');
    el.classList.add('stars');
    el.textContent = type === 'basic' ? '⭐' : '⭐⭐';
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
    console.log(element);
    if (element.tagName === 'H2') {
        bar.classList.add('bg-theme--top');
    }
    progress.appendChild(bar);
    element.parentElement.insertAdjacentElement('beforeend', progress);
};

const createInitials = (element, text) => {
    if (!element) return;
    const h2 = document.createElement('h2');
    h2.classList.add('grid__initials');
    const split = text.trim().split(' ');
    const initials = split.length > 1 ? split[0][0] + split[1][0] : split[0][0];
    h2.textContent = initials;
    element.appendChild(h2);
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

const createAreaLink = (element, text, title, theme, area) => {
    if (!element) return;
    const link = document.createElement('a');
    link.classList.add('grid__link');
    link.classList.add('stretched-link');
    link.href = `/${theme}/${area}`;
    link.textContent = text;
    link.title = title;
    element.appendChild(link);
};

const createGridProgressBar = (
    element,
    total = 0,
    completed = 0,
    theme = false
) => {
    if (!element) return;

    const width = 100 / total;
    const segmentWidth = total !== 0 ? width : 0;
    let progress = segmentWidth * completed;

    // console.log(total, completed, progress);
    let bar;
    // left top
    const left = document.createElement('div');
    left.classList.add('grid__progress--left');
    const leftTop = document.createElement('div');
    leftTop.classList.add('grid__progress--left-top');
    const leftBottom = document.createElement('div');
    leftBottom.classList.add('grid__progress--left-bottom');

    left.appendChild(leftTop);
    left.appendChild(leftBottom);

    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.classList.add('grid__progress-bar--left-top');
    bar.setAttribute(
        'style',
        `height: ${progress >= 12.5 ? 100 : progress * 4}%`
    );
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        leftTop.classList.add('grid__progress--theme');
    }
    leftTop.appendChild(bar);

    progress -= 12.5;

    // top
    const top = document.createElement('div');
    top.classList.add('grid__progress--top');
    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.setAttribute('style', `width: ${progress >= 25 ? 100 : progress * 4}%`);
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        top.classList.add('grid__progress--theme');
    }
    top.appendChild(bar);

    progress -= 25;

    // right
    const right = document.createElement('div');
    right.classList.add('grid__progress--right');
    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.setAttribute(
        'style',
        `height: ${progress >= 25 ? 100 : progress * 4}%`
    );
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        right.classList.add('grid__progress--theme');
    }
    right.appendChild(bar);

    progress -= 25;

    // bottom
    const bottom = document.createElement('div');
    bottom.classList.add('grid__progress--bottom');
    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.setAttribute('style', `width: ${progress >= 25 ? 100 : progress * 4}%`);
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        bottom.classList.add('grid__progress--theme');
    }
    bottom.appendChild(bar);

    progress -= 25;

    // left bottom
    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.classList.add('grid__progress-bar--left-bottom');
    // bottom progress
    bar.setAttribute(
        'style',
        `height: ${progress >= 12.5 ? 100 : progress * 4}%`
    );
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        leftBottom.classList.add('grid__progress--theme');
    }
    leftBottom.appendChild(bar);

    element.appendChild(top);
    element.appendChild(right);
    element.appendChild(bottom);
    element.appendChild(left);
};

export {
    continuePopup,
    createAreaLink,
    createGridProgressBar,
    createInitials,
    createProgressBar,
    createStars,
    setupAssignments,
    showHideTests,
};
