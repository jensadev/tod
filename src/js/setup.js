import data from '../json/tod.json';
import {
    createProgressBar,
    createStars,
    setupAssignments,
    showHideTests,
} from './dom';
import Storage from './Storage';
import { strip } from './strip';

const setup = () => {
    let subject;
    let theme;
    let area;
    let part;
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

    const last = storage.getLastCompleted();
    if (last) {
        const continueElement = document.querySelector('.continue');
        if (continueElement) {
            const list = continueElement.querySelectorAll('li');
            list[0].querySelectorAll(
                'span'
            )[1].textContent += ` : ${last.theme}`;
            list[1].querySelectorAll(
                'span'
            )[1].textContent += ` : ${last.area}`;
            list[2].querySelectorAll(
                'span'
            )[1].textContent += ` : ${last.part}`;
        }
        const continueButton = document.querySelector('.continue__button');
        if (continueButton) {
            console.log(`${last.theme}/${last.area}/${last.part}`);
            continueButton.href = `/${last.theme}/${last.area}/${last.part}.html`;
        }
    }

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
                    const count = storage.countAssignments(part, 'basic');
                    areaTotal += count.total;
                    areaCompleted += count.completed;
                    if (storage.checkCompleted(part, 'basic')) {
                        const partElement = document.querySelector(
                            `#part-${part.part}`
                        );
                        createStars(partElement);
                    }
                    if (storage.checkCompleted(part, 'extra')) {
                        const partElement = document.querySelector(
                            `#part-${part.part}`
                        );
                        createStars(partElement, 'extra');
                    }
                });
                const areaElement = document.querySelector(
                    `#heading-${area.area}`
                );
                createProgressBar(areaElement, areaTotal, areaCompleted);
                themeTotal += areaTotal;
                themeCompleted += areaCompleted;
            });
            const themeHeader = document.querySelector(
                `#heading-${theme.theme}`
            );
            createProgressBar(themeHeader, themeTotal, themeCompleted);
        });
    }
    const testElements = document.querySelectorAll('.test');
    showHideTests(testElements, storage);
};

export { setup };
