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

    const top = document.createElement('div');
    top.classList.add('grid__progress--top');
    let bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.setAttribute('style', `width: ${progress > 25 ? 100 : progress}%`);
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        top.classList.add('grid__progress--theme');
    }
    top.appendChild(bar);
    const right = document.createElement('div');
    right.classList.add('grid__progress--right');
    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.setAttribute(
        'style',
        `height: ${progress > 50 ? 100 : progress < 25 ? 0 : progress}%`
    );
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        right.classList.add('grid__progress--theme');
    }
    right.appendChild(bar);
    const bottom = document.createElement('div');
    bottom.classList.add('grid__progress--bottom');
    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.setAttribute(
        'style',
        `width: ${progress > 75 ? 100 : progress < 50 ? 0 : progress}%`
    );
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        bottom.classList.add('grid__progress--theme');
    }
    bottom.appendChild(bar);
    const left = document.createElement('div');
    left.classList.add('grid__progress--left');
    bar = document.createElement('div');
    bar.classList.add('grid__progress-bar');
    bar.setAttribute('style', `height: ${progress < 75 ? 0 : progress}%`);
    if (theme) {
        bar.classList.add('grid__progress-bar--theme');
        left.classList.add('grid__progress--theme');
    }
    left.appendChild(bar);

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
