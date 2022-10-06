import { restore } from './strip';

const popupItem = (element, text, href) => {
    if (!element) return;
    const link = element.querySelector('a');
    if (link) {
        link.textContent = restore(text);
        link.href = href;
    }
};

const continuePopup = (check, last) => {
    if (check) return;
    const template = document.querySelector('template#continue');
    const clone = template.content.cloneNode(true);
    const close = clone.querySelector('.button__close');
    close.addEventListener('click', () => {
        const now = Date.now();
        localStorage.setItem('continue', now);
        document.querySelector('#continue-popup').remove();
    });
    const list = clone.querySelectorAll('li');
    popupItem(list[0], last.theme, `/${last.theme}`);
    popupItem(list[1], last.area, `/${last.theme}/${last.area}/`);
    popupItem(list[2], last.part, `/${last.theme}/${last.area}/${last.part}/`);
    const continueButton = clone.querySelector('.continue__button');
    if (continueButton) {
        continueButton.href = `/${last.theme}/${last.area}/${last.part}/`;
        continueButton.addEventListener('click', () => {
            const now = Date.now();
            localStorage.setItem('continue', now);
        });
    }
    document.body.appendChild(clone);
};

export { continuePopup };