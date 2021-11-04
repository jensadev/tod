import data from '../json/tod.json';
import strip from '../utils/strip';
import Storage from './Storage';
import { setupAssignments, createStars, createProgressBar } from './dom';
import _filter from 'lodash/fp/filter';

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
    } else if (!theme) {
        const themes = storage.getThemes();
        themes.map((theme) => {
            let themeTotal = 0;
            let themeCompleted = 0;
            theme.areas.map((area) => {
                let areaTotal = 0;
                let areaCompleted = 0;
                area.parts.map((part) => {
                    // works needs refactor
                    let count = storage.countAssignments(part, 'basic');
                    areaTotal += count.total;
                    areaCompleted += count.completed;
                    if (storage.checkCompleted(part, 'basic')) {
                        const partElement = document.querySelector(
                            `#part-${part.name}`
                        );
                        createStars(partElement);
                    }
                    if (storage.checkCompleted(part, 'extra')) {
                        const partElement = document.querySelector(
                            `#part-${part.name}`
                        );
                        createStars(partElement, 'extra');
                    }
                });
                const areaElement = document.querySelector(
                    `#heading-${area.name}`
                ).parentElement;
                createProgressBar(areaElement, areaTotal, areaCompleted);
                themeTotal += areaTotal;
                themeCompleted += areaCompleted;
            });
            const themeHeader = document.querySelector(
                `#heading-${theme.name}`
            ).parentElement;

            createProgressBar(themeHeader, themeTotal, themeCompleted);
        });
    }
};

export { setup };
