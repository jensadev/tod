import { numberOfAssignments } from './data-utils';
import { createProgressBar, createStars, setupAssignments } from './dom-new';
import Storage from './Storage-new';
import { strip } from './strip';

const setup = (jsonData, consentState = null) => {
    if (!consentState) return;

    const config = {
        subject: null,
        theme: null,
        area: null,
        part: null,
    };
    const nav = document.querySelectorAll('nav .breadcrumb li');
    if (nav.length === 0) {
        config.subject = strip(document.title);
        if (config.subject.includes('404')) {
            // prevent subject from being set to 404
            config.subject = config.subject.split('---')[2];
        }
    } else {
        config.subject = strip(nav[0].textContent);
        config.theme = nav[1] ? strip(nav[1].textContent) : null;
        config.area = nav[2] ? strip(nav[2].textContent) : null;
        config.part = nav[3] ? strip(nav[3].textContent) : null;
    }

    const storage = new Storage(config.subject, jsonData);

    if (config.part) {
        setupAssignments(storage, [config.theme, config.area, config.part]);
    } else if (!config.theme) {
        for (const theme of jsonData.themes) {
            let themeTotal = 0;
            let themeCompleted = 0;
            let themeAreaCompleted = 0;
            if (theme.areas.length > 0) {
                let areaTotal = 0;
                let areaCompleted = 0;
                for (const area of theme.areas) {
                    for (const part of area.parts) {
                        const count = numberOfAssignments(storage, [
                            theme.theme,
                            area.area,
                            part.part,
                        ]);
                        console.log(count);
                        if (count.total > 0) {
                            areaTotal += count.basic.total;
                            areaCompleted += count.basic.completed;
                            if (count.basic.completed === count.basic.total) {
                                const partElement = document.querySelector(
                                    `#part-${part.part}`
                                );
                                createStars(partElement);
                            }
                            if (count.extra) {
                                if (
                                    count.extra.completed === count.extra.total
                                ) {
                                    const partElement = document.querySelector(
                                        `#part-${part.part}`
                                    );
                                    createStars(partElement, 'extra');
                                }
                            }
                        }
                    }
                    const areaElement = document.querySelector(
                        `#heading-${area.area}`
                    );
                    createProgressBar(areaElement, areaTotal, areaCompleted);
                }
                themeTotal += areaTotal;
                themeCompleted += areaCompleted;
                themeAreaCompleted += areaCompleted === areaTotal ? 1 : 0;
            }
            const themeHeader = document.querySelector(
                `#heading-${theme.theme}`
            );
            createProgressBar(themeHeader, themeTotal, themeCompleted);
        }
    }
};

export { setup };
