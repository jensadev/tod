const { star, stars } = require('../shortcodes/svg.js');

module.exports = {
    intro: (content) => {
        return `<section class="part__introduction flow" role="inledning">
        <h2 id="introduktion" tabindex="-1">Introduktion <a class="header-anchor" href="#introduktion"><span class="anchor" aria-hidden="true">#</span></a></h2>
        ${content}</section>`;
    },
    instruktioner: (content) => {
        return `<section class="part__instructions flow" role="instruktioner">
        <h2 id="instruktioner" tabindex="-1">Instruktioner <a class="header-anchor" href="#instruktioner"><span class="anchor" aria-hidden="true">#</span></a></h2>
        ${content}</section>`;
    },
    uppgifter: (content, lead) => {
        return `<section class="part__assignments flow" role="uppgifter"><header>
        <h2 id="uppgifter" tabindex="-1">Uppgifter <a class="header-anchor" href="#uppgifter"><span class="anchor" aria-hidden="true">#</span></a></h2>
        ${lead ? lead : ''}</header>${content}</section>`;
    },
    bas: (content) => {
        return `<div class="part__assignments-basic"><h3>${star()}</h3><div class="flow">${content}</div></div>`;
    },
    extra: (content) => {
        return `<div class="part__assignments-extra"><h3>${stars()}</h3><div class="flow">${content}</div></div>`;
    },
    facit: (content, title) => {
        return `<section class="part__solution flow">
        <h2 id="facit" tabindex="-1">${
            title ? title : 'Hjälp'
        } <a class="header-anchor" href="#facit"><span class="anchor" aria-hidden="true">#</span></a></h2>
        ${content}</section>`;
    },
    lead: (content) => {
        return `<p class="lead">${content}</p>`;
    },
    hint: (content, type) => {
        return `<aside class="hint ${type ? type : ''}">${content}</aside>`;
    },
};
