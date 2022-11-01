import data from '../json/tod.json';
import { accordion } from './accordion';
import { consent as consentPopup } from './consent';
import { feedback } from './feedback';
import { installSW } from './install';
import { notes } from './notes';
import { siteSearch } from './search';
import { setup } from './setup';

window.addEventListener('load', () => {
    siteSearch();
    const consent = localStorage.getItem('consent');
    if (!consent && consent !== 'false') {
        consentPopup(
            `Den här webbplatsen sparar information i din webbläsare 
            om dina uppgifter och anteckningar.`,
            `Ok`
        );
    }
    // view();
    // const state = localStorage.getItem('view');
    // if (state !== 'grid') {
    //     accordion();
    // }
    accordion();
    feedback();
    notes();
    installSW();
    setup(data, consent);
});
