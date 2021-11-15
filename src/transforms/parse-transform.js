/* eslint-disable require-jsdoc */
const jsdom = require('@tbranyen/jsdom');
const { JSDOM } = jsdom;
// const minify = require('../utils/minify.js');
// const slugify = require('slugify');
const fs = require('fs');
const strip = require('../utils/strip.js');

function getAssignments(document) {
    const basicAssignments = [
        ...document.querySelectorAll('.part__assignments > h4'),
    ];
    const assignments = [];
    if (basicAssignments.length > 0) {
        basicAssignments.forEach((assignment) => {
            assignments.push({
                assignment: strip(assignment.textContent),
                type: 'basic',
                completed: false,
                date: null,
            });
        });
    }

    const extraAssignments = [
        ...document.querySelectorAll('.part__assignments-extra > h4'),
    ];

    if (extraAssignments.length > 0) {
        extraAssignments.forEach((assignment) => {
            assignments.push({
                assignment: strip(assignment.textContent),
                type: 'extra',
                completed: false,
                date: null,
            });
        });
    }

    return assignments;
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

            if (structure[0] !== undefined) {
                name = strip(structure[0].textContent);
                if (json.subject === undefined) {
                    json.subject = name;
                }
                if (json.themes === undefined) {
                    json.themes = [];
                }
            }

            if (structure[1] !== undefined) {
                theme = strip(structure[1].textContent);

                const themeObj = json.themes.find((o) => o.theme === theme);

                if (themeObj === undefined) {
                    const temp = {};
                    temp.theme = theme;
                    temp.areas = [];
                    json.themes.push(temp);
                }
            }

            if (structure[2] !== undefined) {
                area = strip(structure[2].textContent);
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

            if (structure[3] !== undefined) {
                part = strip(structure[3].textContent);
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
                            temp.assignments = getAssignments(document);
                            areaObj.parts.push(temp);
                        } else {
                            partObj.assignments = getAssignments(document);
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
