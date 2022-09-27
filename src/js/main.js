import { accordion } from './accordion';
import { siteSearch } from './search';
import { setup } from './setup';
import { view } from './view';

window.addEventListener('load', () => {
    siteSearch();
    view();
    const state = localStorage.getItem('view');
    if (state !== 'grid') {
        accordion();
    }
    setup();

    const fbClose = document.querySelector('#feedback-close');
    const fbOpen = document.querySelector('#feedback-open');
    const fbOverlay = document.querySelector('#feedback-overlay');

    fbClose.addEventListener('click', (e) => {
        e.preventDefault();
        fbOverlay.classList.toggle('feedback-overlay--active');
    });
    fbOpen.addEventListener('click', (e) => {
        e.preventDefault();
        fbOverlay.classList.toggle('feedback-overlay--active');
        const fbInput = document.querySelector('#message');
        fbInput.focus();
    });
});
