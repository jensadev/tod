const jsdom = require('@tbranyen/jsdom');
const { JSDOM } = jsdom;
const minify = require('../utils/minify.js');
const slugify = require('slugify');
const fs = require('fs');
const strip = require('../utils/strip.js');

function getAssignments(document) {
    const basicAssignments = [
        ...document.querySelectorAll('.part__assignments > h4')
    ];
    let assignments = [];
    if (basicAssignments.length > 0) {
        basicAssignments.forEach((assignment) => {
            assignments.push({
                name: strip(assignment.textContent),
                type: 'basic',
                completed: false,
                date: null
            });
        });
    }

    const extraAssignments = [
        ...document.querySelectorAll('.part__assignments-extra > h4')
    ];

    if (extraAssignments.length > 0) {
        extraAssignments.forEach((assignment) => {
            assignments.push({
                name: strip(assignment.textContent),
                type: 'extra',
                completed: false,
                date: null
            });
        });
    }

    return assignments;
}

module.exports = function (value, outputPath) {
    if (outputPath.endsWith('.html')) {
        const DOM = new JSDOM(value, {
            resources: 'usable'
        });

        const document = DOM.window.document;

        const structure = document.querySelectorAll('nav .breadcrumb li');

        if (structure !== undefined) {
            const path = './src/json/tod.json';
            let json, name, theme, area, part;

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
                if (json.name === undefined) {
                    json.name = name;
                }
                if (json.themes === undefined) {
                    json.themes = [];
                }
            }

            if (structure[1] !== undefined) {
                theme = strip(structure[1].textContent);

                let themeObj = json.themes.find((o) => o.name === theme);

                if (themeObj === undefined) {
                    let temp = {};
                    temp.name = theme;
                    temp.areas = [];
                    json.themes.push(temp);
                }
            }

            if (structure[2] !== undefined) {
                area = strip(structure[2].textContent);
                let themeObj = json.themes.find((o) => o.name === theme);

                if (themeObj !== undefined) {
                    let areaObj = themeObj.areas.find((o) => o.name === area);

                    if (areaObj === undefined) {
                        let temp = {};
                        temp.name = area;
                        temp.parts = [];
                        themeObj.areas.push(temp);
                    }
                }
            }

            if (structure[3] !== undefined) {
                part = strip(structure[3].textContent);
                let themeObj = json.themes.find((o) => o.name === theme);
                if (themeObj !== undefined) {
                    let areaObj = themeObj.areas.find((o) => o.name === area);
                    if (areaObj !== undefined) {
                        let partObj = areaObj.parts.find(
                            (o) => o.name === part
                        );
                        if (partObj === undefined) {
                            let temp = {};
                            temp.name = part;
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

        return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
    }
    return value;
};
