import { setupAssignments } from './dom-new';
import Storage from './Storage-new';
import { strip } from './strip';

const setup = (data, viewState = 'list', consentState = null) => {
    console.log(viewState, consentState);
    if (!consentState) return;

    let subject;
    let theme;
    let area;
    let part;
    const nav = document.querySelectorAll('nav .breadcrumb li');
    if (nav.length === 0) {
        subject = strip(document.title);
        if (subject.includes('404')) {
            // prevent subject from being set to 404
            subject = subject.split('---')[2];
        }
    } else {
        subject = strip(nav[0].textContent);
        theme = nav[1] ? strip(nav[1].textContent) : null;
        area = nav[2] ? strip(nav[2].textContent) : null;
        part = nav[3] ? strip(nav[3].textContent) : null;
    }
    console.log(subject, theme, area, part);

    const storage = new Storage(subject);

    if (part) {
        setupAssignments([theme, area, part], storage);
        // setupAssignments(
        //     document.querySelector('.part__assignments'),
        //     storage,
        //     [theme, area, part]
        // );
    } else if (!theme) {
        console.log('setup list');
        // setupList(document.querySelector('.list'), storage);
        for (const theme of data.themes) {
            console.log(theme);
        }
    }
};

export { setup };
