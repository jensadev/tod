const jsdom = require('@tbranyen/jsdom');
const { JSDOM } = jsdom;
const minify = require('../utils/minify.js');
const slugify = require('slugify');

const fs = require('fs');

const strip = (str) => {
    if (str === undefined) return;
    return str
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o');
};

function getAssignments(document) {
    const basicAssignments = [
        ...document.querySelectorAll(
            '.part__assignments > h4'
        )
    ];
    let basic = [];
    if (basicAssignments.length > 0) {
        basicAssignments.forEach((assignment) => {
            basic.push(strip(assignment.textContent));
        });
    }

    const extraAssignments = [
        ...document.querySelectorAll(
            '.part__assignments-extra > h4'
        )
    ];
    let extra = [];
    if (extraAssignments.length > 0) {
        extraAssignments.forEach((assignment) => {
            extra.push(strip(assignment.textContent));
        });
    }

    return {
        basic: basic,
        extra: extra
    }
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
            let json, subject, theme, area, part;

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
                subject = strip(structure[0].textContent);
                if (json.subject === undefined) {
                    json.subject = subject;
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
