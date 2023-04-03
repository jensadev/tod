import { accordion } from './accordion';
import { continuePopup } from './continue';
import { djb2_xor } from './djb2_xor';
import {
    createProgressBar,
    createStars,
    setupQuestions,
    showHideTests,
} from './dom';
import { notes } from './notes';
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
        config.subject = strip(
            document.querySelector('.navbar__header > a').textContent
        );
        config.theme = nav[0] ? strip(nav[0].textContent) : null;
        config.area = nav[1] ? strip(nav[1].textContent) : null;
        config.part = nav[2] ? strip(nav[2].textContent) : null;

        console.log(config);
    }

    const storage = new Storage(config.subject, jsonData);

    const lastCompletedQuestion = storage.lastCompletedQuestion();
    if (lastCompletedQuestion) {
        const questionData = storage.findQuestionByID(
            lastCompletedQuestion.id,
            true
        );
        if (questionData) {
            let check = localStorage.getItem('continue');
            if (check && Date.now() - 7200000 > check) {
                localStorage.removeItem('continue');
                check = false;
            }
            continuePopup(check, questionData);
        }
    }

    if (config.part) {
        notes();
        document.querySelector('body').id = `tod-${djb2_xor(
            config.theme + config.area + config.part
        )}`;
        setupQuestions(storage, config.theme, config.area, config.part);
    } else if (!config.theme) {
        // fix error on help etc
        accordion();
        for (const theme of jsonData.themes) {
            let themeTotal = 0;
            let themeCompleted = 0;
            if (theme.areas.length > 0) {
                for (const area of theme.areas) {
                    let areaTotal = 0;
                    let areaCompleted = 0;
                    for (const part of area.parts) {
                        const count = storage.questionsStatus(
                            theme.theme,
                            area.area,
                            part.part
                        );
                        if (count) {
                            areaTotal += count.base.total;
                            areaCompleted += count.base.completed;
                            if (count.base.completed === count.base.total) {
                                const partElement = document.querySelector(
                                    `#part-${part.part}`
                                );
                                createStars(partElement);
                            }
                            if (count.advanced.total > 0) {
                                if (
                                    count.advanced.completed ===
                                    count.advanced.total
                                ) {
                                    const partElement = document.querySelector(
                                        `#part-${part.part}`
                                    );
                                    createStars(partElement, 'advanced');
                                }
                            }
                        }
                    }
                    const areaElement = document.querySelector(
                        `#area-${area.area}`
                    );
                    // console.log(area.area, areaTotal, areaCompleted);
                    createProgressBar(areaElement, areaTotal, areaCompleted);
                    themeTotal += areaTotal > 0 ? areaTotal : 0;
                    themeCompleted += areaCompleted > 0 ? areaCompleted : 0;
                }
            }
            const themeHeader = document.querySelector(`#theme-${theme.theme}`);
            // console.log('------' + theme.theme, themeTotal, themeCompleted);
            createProgressBar(themeHeader, themeTotal, themeCompleted);
        }
    }
    const testElements = document.querySelectorAll('.test');
    showHideTests(testElements, storage);
};

export { setup };
