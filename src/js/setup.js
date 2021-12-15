import data from '../json/tod.json';
import {
    continuePopup,
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

    const consent = localStorage.getItem('consent');

    if (!consent) {
        const flash = document.querySelector('#flash-message');
        flash.classList.toggle('invisible');
        const inner = flash.querySelector('.flash__inner');
        const message = inner.querySelector('.flash__message');
        const button = document.createElement('button');
        button.classList.add('button', 'flash__button');
        button.textContent = `Ok`;
        const p = document.createElement('p');
        p.textContent = `Den här webbplatsen sparar information i din webbläsare 
        om vilka uppgifter du arbetat med och slutfört.`;
        message.appendChild(p);
        inner.appendChild(button);
        button.addEventListener('click', () => {
            localStorage.setItem('consent', 'true');
            flash.classList.toggle('invisible');
            setup();
        });
    } else {
        const storage = new Storage(data, subject);

        const lastCompletedAssignment = storage.lastCompletedAssignment();
        const continueElement = document.querySelector('.continue');
        if (lastCompletedAssignment) {
            continueElement.classList.toggle('invisible');
            let check = localStorage.getItem('continue');
            if (check && Date.now() - 7200000 > check) {
                localStorage.removeItem('continue');
                check = false;
            }
            continuePopup(continueElement, check, lastCompletedAssignment);
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
    }
};

export { setup };
