const { star, stars } = require('../shortcodes/svg.js'); 

module.exports = {
    intro: (content) => {
        return `<section class="part__introduction" role="inledning">${content}</section>`;
    },
    instruktioner: (content) => {
        return `<section class="part__instructions" role="instruktioner">${content}</section>`;
    },
    uppgifter: (content, lead) => {
        return `<section class="part__assignments" role="uppgifter"><header><h2 id="uppgifter">Uppgifter</h2>${ lead ? lead : '' }</header>${content}</section>`;
    },
    bas: (content) => {
        return `<div class="part__assignments-basic"><h3>${star()}</h3><div>${content}</div></div>`;
    },
    extra: (content) => {
        return `<div class="part__assignments-extra"><h3>${stars()}</h3><div>${content}</div></div>`;
    },
    facit: (content, title) => {
        return `<section class="part__solution"><h2>${title}</h2>${content}</section>`;
    },
    lead: (content) => {
        return `<p class="lead">${content}</p>`;
    },
};
