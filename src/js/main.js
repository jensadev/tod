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
});
