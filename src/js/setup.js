import data from '../json/tod.json';
import {
    continuePopup,
    createProgressBar,
    createProgressSvg,
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

    const view = localStorage.getItem('view');

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
                let themeAreaCompleted = 0;
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
                    if (view === 'grid') {
                        // grid view
                        console.log(areaElement);
                        areaElement.classList.remove('accordion__item-header');
                        const areaButton = areaElement.querySelector('button');
                        // areaButton.classList.remove('accordion__item-button');
                        areaElement.removeChild(areaButton);
                        const areaParent = areaElement.parentElement;
                        areaParent.classList.remove('accordion__item');
                        areaParent.classList.add('grid__item');

                        const areaInitials = document.createElement('h2');
                        areaInitials.classList.add('grid__initials');
                        const split = areaButton.textContent.trim().split(' ');
                        const initials =
                            split.length > 1
                                ? split[0][0] + split[1][0]
                                : split[0][0];
                        areaInitials.textContent = initials;
                        areaParent.appendChild(areaInitials);

                        const areaLink = document.createElement('a');
                        areaLink.classList.add('grid__link');
                        areaLink.classList.add('stretched-link');
                        areaLink.href = `/${theme.theme}/${area.area}`;
                        areaLink.textContent = areaButton.textContent.trim();
                        areaLink.title = areaButton.title;
                        areaElement.appendChild(areaLink);

                        const top = document.createElement('div');
                        top.classList.add('grid__top');
                        let bar = document.createElement('div');
                        bar.classList.add('grid__bar');
                        top.appendChild(bar);
                        const bottom = document.createElement('div');
                        bottom.classList.add('grid__bottom');
                        bar = document.createElement('div');
                        bar.classList.add('grid__bar');
                        bottom.appendChild(bar);
                        const left = document.createElement('div');
                        left.classList.add('grid__left');
                        bar = document.createElement('div');
                        bar.classList.add('grid__bar');
                        left.appendChild(bar);
                        const right = document.createElement('div');
                        right.classList.add('grid__right');
                        bar = document.createElement('div');
                        bar.classList.add('grid__bar');
                        right.appendChild(bar);

                        areaParent.appendChild(top);
                        areaParent.appendChild(bottom);
                        areaParent.appendChild(left);
                        areaParent.appendChild(right);

                        // createProgressSvg(areaParent, areaTotal, areaCompleted);
                    } else {
                        createProgressBar(
                            areaElement,
                            areaTotal,
                            areaCompleted
                        );
                    }
                    themeTotal += areaTotal;
                    themeCompleted += areaCompleted;
                    themeAreaCompleted += areaCompleted === areaTotal ? 1 : 0;
                });
                const themeHeader = document.querySelector(
                    `#heading-${theme.theme}`
                );
                if (view === 'grid') {
                    // grid view
                    const collapseAreas = document.querySelectorAll(
                        '.accordion__item-collapse'
                    );
                    collapseAreas.forEach((collapseArea) => {
                        collapseArea.classList.add('invisible');
                    });
                    const container = document.querySelector('.accordion');
                    if (container) {
                        container.classList.remove('accordion');
                        container.classList.add('flow');
                        container.classList.add('grid');
                        const inner = container.querySelectorAll('.accordion__inner');
                        inner.forEach((inner) => {
                            inner.classList.remove('accordion__inner');
                            inner.classList.remove('flow');
                            inner.classList.add('grid__inner');
                        });
                    }
                    if (themeHeader) {
                        themeHeader.classList.remove('accordion__item-header');
                        if (themeHeader?.parentElement) {
                            const parent = themeHeader.parentElement;
                            parent.classList.remove('accordion__item');
                            parent.classList.add('grid__item');
                            console.log(theme.areas.length, themeAreaCompleted);
                            createProgressBar(
                                parent,
                                theme.areas.length,
                                themeAreaCompleted,
                                true
                            );
                        }
                    }
                } else {
                    createProgressBar(themeHeader, themeTotal, themeCompleted);
                }
            });
        }
        const testElements = document.querySelectorAll('.test');
        showHideTests(testElements, storage);
    }
};

export { setup };
