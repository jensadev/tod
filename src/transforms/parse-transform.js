/* eslint-disable require-jsdoc */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// const minify = require('../utils/minify.js');
// const slugify = require('slugify');
const fs = require('fs');
const strip = require('../utils/strip.js');

function djb2_xor(str) {
    let len = str.length;
    let h = 5381;

    for (let i = 0; i < len; i++) {
        h = (h * 33) ^ str.charCodeAt(i);
    }
    return h >>> 0;
}

function getQuestions(document, theme, area, part) {
    const basicQuestions = [
        ...document.querySelectorAll('.part__questions-base h4'),
    ];
    const questions = [];
    if (basicQuestions.length > 0) {
        basicQuestions.forEach((question) => {
            const title = strip(question.textContent);
            questions.push({
                question: title,
                text: question.nextSibling.nextSibling.textContent,
                id: djb2_xor(theme + area + part + title),
                type: 'base',
                completed: false,
                date: null,
            });
        });
    }

    const advancedQuestions = [
        ...document.querySelectorAll('.part__questions-advanced h4'),
    ];

    if (advancedQuestions.length > 0) {
        advancedQuestions.forEach((question) => {
            const title = strip(question.textContent);
            questions.push({
                question: title,
                id: djb2_xor(theme + area + part + title),
                type: 'advanced',
                completed: false,
                date: null,
            });
        });
    }

    return questions;
}

module.exports = function (value, outputPath) {
    if (outputPath.endsWith('.html')) {
        const DOM = new JSDOM(value, {
            resources: 'usable',
        });

        const document = DOM.window.document;

        const structure = document.querySelectorAll('nav .breadcrumb li');

        if (structure !== undefined) {
            const path = './src/json/tod.json';
            let json;
            let name;
            let theme;
            let area;
            let part;

            try {
                if (!fs.existsSync(path)) {
                    fs.writeFileSync(path, '{}');
                }
            } catch (error) {
                console.error('An error has occurred ', error);
            }

            try {
                const jsonString = fs.readFileSync(path, 'utf8');
                if (jsonString === '') {
                    json = JSON.parse('{}');
                } else {
                    json = JSON.parse(jsonString);
                }
            } catch (error) {
                console.error('An error has occurred ', error);
                json = JSON.parse('{}');
            }

            /* Get element from DOM to set subject */
            const el = document.querySelector('.navbar__header > a');

            if (el !== undefined) {
                name = strip(el.textContent);

                if (json.subject === undefined) {
                    json.subject = name;
                }
                if (json.themes === undefined) {
                    json.themes = [];
                }
            }

            /* Use the breadcrumb structure to set theme, area and part */
            if (structure[0] !== undefined) {
                theme = strip(structure[0].textContent);

                const themeObj = json.themes.find((o) => o.theme === theme);

                if (themeObj === undefined) {
                    const temp = {};
                    temp.theme = theme;
                    temp.areas = [];
                    json.themes.push(temp);
                }
            }

            if (structure[1] !== undefined) {
                area = strip(structure[1].textContent);
                const themeObj = json.themes.find((o) => o.theme === theme);

                if (themeObj !== undefined) {
                    const areaObj = themeObj.areas.find((o) => o.area === area);

                    if (areaObj === undefined) {
                        const temp = {};
                        temp.area = area;
                        temp.parts = [];
                        themeObj.areas.push(temp);
                    }
                }
            }

            if (structure[2] !== undefined) {
                part = strip(structure[2].textContent);
                const themeObj = json.themes.find((o) => o.theme === theme);
                if (themeObj !== undefined) {
                    const areaObj = themeObj.areas.find((o) => o.area === area);
                    if (areaObj !== undefined) {
                        const partObj = areaObj.parts.find(
                            (o) => o.part === part
                        );
                        if (partObj === undefined) {
                            const temp = {};
                            temp.part = part;
                            temp.questions = getQuestions(
                                document,
                                theme,
                                area,
                                part
                            );
                            areaObj.parts.push(temp);
                        } else {
                            partObj.questions = getQuestions(
                                document,
                                theme,
                                area,
                                part
                            );
                        }
                    }
                }
            }

            try {
                fs.writeFileSync(path, JSON.stringify(json, null, 2), 'utf8');
            } catch (error) {
                console.error('An error has occurred ', error);
            }
        }

        return `<!DOCTYPE html>\r\n${document.documentElement.outerHTML}`;
    }
    return value;
};
