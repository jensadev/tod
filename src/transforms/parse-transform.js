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
                if (json[subject] === undefined) {
                    json[subject] = {};
                }
            }

            if (structure[1] !== undefined) {
                theme = strip(structure[1].textContent);
                if (json[subject][theme] === undefined) {
                    json[subject][theme] = {};
                }
            }

            if (structure[2] !== undefined) {
                area = strip(structure[2].textContent);
                if (json[subject][theme][area] === undefined) {
                    json[subject][theme][area] = {};
                }
            }

            if (structure[3] !== undefined) {
                part = strip(structure[3].textContent);
                if (json[subject][theme][area][part] === undefined) {
                    json[subject][theme][area][part] = [];
                }
                const basicAssignments = [
                    ...document.querySelectorAll('.part__assignments > h4')
                ];
                let temp = [];
                basicAssignments.forEach((assignment) => {
                    temp.push(strip(assignment.textContent));
                });
                if (json[subject][theme][area][part] !== temp) {
                    json[subject][theme][area][part] = temp;
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
