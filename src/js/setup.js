import { continuePopup } from './continue';
import { djb2_xor } from './djb2_xor';
import {
    createProgressBar,
    createStars,
    setupAssignments,
    showHideTests,
} from './dom';
import Storage from './Storage';
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

    const lastCompletedAssignment = storage.lastCompletedAssignment();
    if (lastCompletedAssignment) {
        const assignmentData = storage.findAssignmentByID(
            lastCompletedAssignment.id,
            true
        );
        if (assignmentData) {
            let check = localStorage.getItem('continue');
            if (check && Date.now() - 7200000 > check) {
                localStorage.removeItem('continue');
                check = false;
            }
            continuePopup(check, assignmentData);
        }
    }

    if (config.part) {
        document.querySelector('body').id = `tod-${djb2_xor(
            config.theme + config.area + config.part
        )}`;
        setupAssignments(storage, config.theme, config.area, config.part);
    }
    // else if (config.area || config.theme) {
    //     console.log({config.area, config.theme});
        
    // }
    else if (!config.theme) {
        for (const theme of jsonData.themes) {
            let themeTotal = 0;
            let themeCompleted = 0;
            if (theme.areas.length > 0) {
                for (const area of theme.areas) {
                    let areaTotal = 0;
                    let areaCompleted = 0;
                    for (const part of area.parts) {
                        const count = storage.assignmentsStatus(
                            theme.theme,
                            area.area,
                            part.part
                        );
                        if (count) {
                            areaTotal += count.basic.total;
                            areaCompleted += count.basic.completed;
                            if (count.basic.completed === count.basic.total) {
                                const partElement = document.querySelector(
                                    `#part-${part.part}`
                                );
                                createStars(partElement);
                            }
                            if (count.extra.total > 0) {
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
                    // console.log(area.area, areaTotal, areaCompleted);
                    createProgressBar(areaElement, areaTotal, areaCompleted);
                    themeTotal += areaTotal > 0 ? areaTotal : 0;
                    themeCompleted += areaCompleted > 0 ? areaCompleted : 0;
                }
            }
            const themeHeader = document.querySelector(
                `#heading-${theme.theme}`
            );
            // console.log('------' + theme.theme, themeTotal, themeCompleted);
            createProgressBar(themeHeader, themeTotal, themeCompleted);
        }
    }
    const testElements = document.querySelectorAll('.test');
    showHideTests(testElements, storage);
};

export { setup };
