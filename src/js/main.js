import { accordion } from './accordion';
import { siteSearch } from './search';
import { setup } from './setup';
import { view } from './view';

window.addEventListener('load', () => {
    accordion();
    siteSearch();
    view();
    setup();
});
