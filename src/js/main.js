import data from '../json/tod.json';
import { accordion } from './accordion';
import { consent as consentPopup } from './consent';
import { feedback } from './feedback';
import { siteSearch } from './search';
import { setup } from './setup';

window.addEventListener('load', () => {
    siteSearch();
    const consent = localStorage.getItem('consent');
    if (!consent && consent !== 'false') {
        consentPopup(
            `Den här webbplatsen sparar information i din webbläsare 
            om vilka uppgifter du arbetat med och slutfört.`,
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
    setup(data, consent);
});
