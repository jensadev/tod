const { star, stars } = require('./index');

module.exports = {
    instructions: (content) => {
        return `<div class="part__instructions flow">${content}</div>`;
    },
    questions: (content, lead) => {
        return `<div class="part__questions region flow"><header>
        <h2 id="uppgifter" tabindex="-1">Uppgifter <a class="header-anchor" href="#uppgifter">
        <span class="anchor" aria-hidden="true">#</span></a></h2>
        ${lead ? lead : ''}</header>${content}</div>`;
    },
    base: (content) => {
        return `<div class="part__questions-base"><h3>${star()}</h3><div class="flow">${content}</div></div>`;
    },
    advanced: (content) => {
        return `<div class="part__questions-advanced"><h3>${stars()}</h3><div class="flow">${content}</div></div>`;
    },
    extra: (content, title) => {
        return `<div class="part__extra flow">
        <h2 id="extra" tabindex="-1">${
            title || 'Hjälp'
        } <a class="header-anchor" href="#extra"><span class="anchor" aria-hidden="true">#</span></a></h2>
        ${content}</div>`;
    },
    lead: (content) => {
        return `<p class="lead">${content}</p>`;
    },
    hint: (content, type) => {
        return `<div class="hint flow ${type ? type : ''}">${content}</div>`;
    },
};
