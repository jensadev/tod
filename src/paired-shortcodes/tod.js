const { star, stars } = require('../shortcodes/svg.js');

module.exports = {
    intro: (content) => {
        return `<section class="part__introduction">${content}</section>`;
    },
    instruktioner: (content) => {
        return `<section class="part__instructions">${content}</section>`;
    },
    uppgifter: (content, lead) => {
        return `<section class="part__assignments flow">
        <header><h2>Uppgifter</h2>${
            lead ? `<p>${lead}</p>` : ''
        }</header>${content}</section>`;
    },
    basic: (content) => {
        return `<div class="part__assignments-basic"><h3>${star()}</h3>${content}</div>`;
    },
    extra: (content) => {
        return `<div class="part__assignments-extra"><h3>${stars()}</h3>${content}</div>`;
    },
    facit: (content, title) => {
        return `<section class="part__solution"><h2>${title}</h2>${content}</section>`;
    },
    lead: (content) => {
        return `<p class="lead">${content}</p>`;
    },
};
