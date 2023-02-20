const data = require('./src/json/tod.json');

const fs = require('fs');

const { themes } = data;

let questions = themes
    .map((theme) => {
        let tempTheme = {
            theme: theme.theme,
        };
        tempTheme.areas = theme.areas.map((area) => {
            let tempArea = {
                area: area.area,
            };
            tempArea.parts = area.parts.map((part) => {
                let tempPart = {
                    part: part.part,
                };
                tempPart.assignments = part.assignments
                    .map((assignment) => {
                        return assignment.text;
                    })
                    .filter((assignment) => {
                        return assignment !== undefined;
                    });
                return tempPart;
            });
            return tempArea;
        });
        return tempTheme;
    })
    .filter((theme) => {
        return theme.areas.length > 0;
    });

fs.writeFileSync(
    './src/_data/questions.json',
    JSON.stringify(questions, null, 2)
);

// Path: index.js
