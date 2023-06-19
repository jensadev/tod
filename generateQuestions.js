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
                tempPart.questions = part.questions
                    .map((question) => {
                        return question.text;
                    })
                    .filter((question) => {
                        return question !== undefined;
                    });
                return tempPart;
            });
            return tempArea;
        });
        return tempTheme;
    })
    .filter((theme) => {
        return theme.areas.length > 0;
    })
    .filter(theme != "slutuppgifter");

fs.writeFileSync(
    './src/_data/questions.json',
    JSON.stringify(questions, null, 2)
);

// Path: index.js
