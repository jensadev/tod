module.exports = {
    intro: (content) => {
        return `<section class="part__introduction flow">${content}</section>`;
    },
    instruktioner: (content) => {
        return `<section class="part__instructions flow">${content}</section>`;
    },
    uppgifter: (content) => {
        return `<section class="part__assignments flow">${content}</section>`;
    },
    extra: (content) => {
        return `<div class="part__assignments-extra flow">${content}</div>`;
    },
    facit: (content) => {
        return `<section class="part__solution flow"><h2>Hjälp</h2>${content}</section>`;
    },
    lead: (content) => {
        return `<p class="lead">${content}</p>`;
    },
};
