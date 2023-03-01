import data from '../json/tod.json';
import { consent as consentPopup } from './consent';
import { feedback } from './feedback';
import { installSW } from './install';
import { menu } from './menu';
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
    feedback();
    installSW();
    menu();
    setup(data, consent);
});
