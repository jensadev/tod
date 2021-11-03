import { strip } from './strip';
import { checkAssignmentsStatus } from './check';

const createProgress = (segments = 0, total = 0) => {
    const progress = document.createElement('div');
    progress.classList.add('progress');
    const bar = document.createElement('div');
    bar.classList.add('progress__bar');
    // bar.classList.add('progress-bar-striped');
    bar.classList.add('bg-theme');
    bar.setAttribute('style', `width: ${segments * total}%`);
    progress.appendChild(bar);
    return progress;
};

const home = () => {
    const subject = strip(document.title);

    const storage = JSON.parse(window.localStorage.getItem(subject));

    const sections = document.querySelectorAll('.accordion__item');

    let themes = [];

    sections.forEach((element) => {
        let h2 = element.querySelector('h2');
        if (h2) {
            let temp = {
                element: element,
                areas: 0,
                completed: 0
            };
            themes.push(temp);
        }

        let h3 = element.querySelector('h3');
        let area = h3 ? strip(h3.textContent) : false;
        if (area) {
            const container = document.querySelector(`#${area}`);
            const parts = container.querySelectorAll('li');
            themes[themes.length - 1].areas =
                themes[themes.length - 1].areas + parts.length;

            let total = 0;
            if (storage && storage[area]) {
                Object.entries(storage[area]).forEach((part) => {
                    part = part[0];
                    let basicCheck = checkAssignmentsStatus(
                        storage[area][part].basic,
                        storage[area][part].assignments?.basic
                    );
                    let extraCheck = checkAssignmentsStatus(
                        storage[area][part].extra,
                        storage[area][part].assignments?.extra
                    );
                    parts.forEach((element) => {
                        if (
                            strip(element.querySelector('a').textContent) ===
                            part
                        ) {
                            if (basicCheck) {
                                total = total + 1;
                                const el = document.createElement('span');
                                el.classList.add('stars');
                                el.textContent = '⭐';
                                element.appendChild(el);
                            }
                            if (extraCheck) {
                                const el = document.createElement('span');
                                el.classList.add('stars');
                                el.textContent = '⭐⭐';
                                element.appendChild(el);
                            }
                        }
                    });
                });
            }
            themes[themes.length - 1].completed =
                themes[themes.length - 1].completed + total;

            element.insertAdjacentElement(
                'beforeend',
                createProgress(100 / parts.length, total)
            );
        }
    });

    themes.forEach((theme) => {
        theme.element.insertAdjacentElement(
            'beforeend',
            createProgress(100 / theme.areas, theme.completed)
        );
    });
};

export { home };
