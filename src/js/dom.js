import confetti from 'canvas-confetti';

import starSvg from '../assets/icons/grade_FILL1_wght400_GRAD0_opsz24.svg';
import { restore, strip } from './strip';

const setupQuestions = (storage, theme, area, part) => {
    const element = document.querySelector('.part__questions');
    if (!element) return;

    console.log('setupQuestions', theme, area, part);

    const questions = storage.getQuestions(theme, area, part);

    showHideElements(storage.questionsStatus(theme, area, part));

    if (questions) {
        const questionElements = element.querySelectorAll('h4');
        for (const question of questions) {
            const title = restore(question.question);
            let el = [...questionElements].find((el) => {
                return el.textContent === title;
            });
            let storedQuestion = storage.findQuestionByID(question.id);
            if (storedQuestion === false) {
                storedQuestion = storage.createQuestion(
                    question.id,
                    question.type
                );
            }
            const box = createCheckbox(el, title, storedQuestion.completed);
            box.addEventListener('change', () => {
                if (confetti && box.checked) {
                    confetti();
                }
                storage.updateQuestion(question.id);
                showHideElements(storage.questionsStatus(theme, area, part));
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
    // const extra = document.querySelector('.part__extra');
    const advanced = document.querySelector('.part__questions-advanced > div');
    if (status.base.total === status.base.completed) {
        if (advanced) {
            showElement(advanced);
        }
        // if (extra) {
        //     showElement(extra);
        // }
    } else {
        if (advanced) {
            hideElement(advanced);
        }
        // if (extra) {
        //     hideElement(extra);
        // }
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
    element.classList.add('part__questions-header');
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
    // console.log(element.parentElement);
    // element.parentElement.insertAdjacentElement('beforeend', progress);
    element.after(progress);
};

const createLabel = (text) => {
    const label = document.createElement('label');
    label.classList.add('sr-only');
    label.setAttribute('for', strip(text));
    label.textContent = `Jag är klar med ${text.replace(/-/g, ' ')}`;
    return label;
};

export { createProgressBar, createStars, setupQuestions, showHideTests };
