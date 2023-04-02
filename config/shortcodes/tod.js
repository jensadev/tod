const { star, stars } = require('./index');

module.exports = {
    instruktioner: (content) => {
        return `<div class="part__instructions flow">${content}</div>`;
    },

    // intro: (content) => {
    //     return `<div class="part__introduction flow">
    //     <h2 id="introduktion" tabindex="-1">Introduktion <a class="header-anchor" href="#introduktion">
    //     <span class="anchor" aria-hidden="true">#</span></a></h2>
    //     ${content}</div>`;
    // },
    // instruktioner: (content, title) => {
    //     return `<div class="part__instructions flow">
    //     <h2 id="instruktioner" tabindex="-1">${title || 'Instruktioner'}
    //     <a class="header-anchor" href="#instruktioner"><span class="anchor" aria-hidden="true">#</span></a>
    //     </h2>
    //     ${content}</div>`;
    // },
    uppgifter: (content, lead) => {
        return `<div class="part__assignments flow"><header>
        <h2 id="uppgifter" tabindex="-1">Uppgifter <a class="header-anchor" href="#uppgifter">
        <span class="anchor" aria-hidden="true">#</span></a></h2>
        ${lead ? lead : ''}</header>${content}</div>`;
    },
    bas: (content) => {
        return `<div class="part__assignments-basic"><h3>${star()}</h3><div class="flow">${content}</div></div>`;
    },
    extra: (content) => {
        return `<div class="part__assignments-extra"><h3>${stars()}</h3><div class="flow">${content}</div></div>`;
    },
    facit: (content, title) => {
        return `<div class="part__solution flow">
        <h2 id="facit" tabindex="-1">${
            title || 'Hjälp'
        } <a class="header-anchor" href="#facit"><span class="anchor" aria-hidden="true">#</span></a></h2>
        ${content}</div>`;
    },
    lead: (content) => {
        return `<p class="lead">${content}</p>`;
    },
    hint: (content, type) => {
        return `<div class="hint flow ${type ? type : ''}">${content}</div>`;
    },
};
