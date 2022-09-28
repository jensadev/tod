import { accordion } from './accordion';
import { feedback } from './feedback';
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
    feedback();
    setup();
});
