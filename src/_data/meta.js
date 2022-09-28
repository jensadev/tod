/* Låt bli */
const colors = require('nice-color-palettes');

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

const getColorPick = () => {
    try {
        const color = colors[getRandomIntInclusive(0, colors.length - 1)];
        const primary = color.splice(
            getRandomIntInclusive(0, color.length - 1),
            1
        ); // color[getRandomIntInclusive(0, color.length - 1)];
        const secondary = color.splice(
            getRandomIntInclusive(0, color.length - 1),
            1
        );
        return {
            primary: primary[0],
            secondary: secondary[0],
        };
    } catch (e) {
        console.log(e);
        return '#121212';
    }
};

const colorPicks = getColorPick();

/* Här nedanför kan du ändra */
module.exports = {
    // NOTE: `process.env.URL` is provided by Netlify, and may need
    // adjusted pending your host
    url: process.env.URL || 'http://localhost:8080',
    // page language
    language: 'sv',
    // Sidans namn, måste överrensstämma med src/index.md title front matter
    siteName: 'Ämnestitel',
    primaryColor: colorPicks.primary, // pick or color string '#ff4e50'
    secondaryColor: colorPicks.secondary, // pick or color string '#ff4e50'
    siteDescription:
        'Instruktionssida för siteskaparen för Tema Område Del, TOD.',
    author: {
        name: 'Jens Andreasson',
        email: 'jensandreasson77@gmail.com',
        url: 'https://jensa.xyz',
    },
};
