import { accordion } from './accordion';
import { nav } from './nav';
import { siteSearch } from './search';
import { setup } from './setup';

window.addEventListener('load', () => {
    accordion();
    siteSearch();
    setup();
    nav();
});
