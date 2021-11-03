import data from '../json/tod.json';
import strip from '../utils/strip';
// import _ from 'lodash';
import Storage from './Storage';
import { setupAssignments } from './dom';

const setup = () => {
    let subject, theme, area, part;
    const nav = document.querySelectorAll('nav .breadcrumb li');
    if (nav.length === 0) {
        subject = strip(document.title);
    } else {
        subject = strip(nav[0].textContent);
        theme = nav[1] ? strip(nav[1].textContent) : null;
        area = nav[2] ? strip(nav[2].textContent) : null;
        part = nav[3] ? strip(nav[3].textContent) : null;
    }

    const storage = new Storage(data, subject);

    if (part) {
        setupAssignments(
            document.querySelector('.part__assignments'),
            storage,
            [theme, area, part]
        );

    }

};

export { setup };
