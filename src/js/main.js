import { accordion } from './accordion';
import { siteSearch } from './search';

import { setup } from './setup';

window.addEventListener('load', () => {
    accordion();
    siteSearch();
    setup();
});
