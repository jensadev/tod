module.exports = {
    intro: (content) => {
        return `<section class="part__introduction">${content}</section>`;
    },
    instruktioner: (content) => {
        return `<section class="part__instructions">${content}</section>`;
    },
    uppgifter: (content) => {
        return `<section class="part__assignments">${content}</section>`;
    },
    extra: (content) => {
        return `<div class="part__assignments-extra">${content}</div>`;
    },
    facit: (content) => {
        return `<section class="part__solution"><h2>Hjälp</h2>${content}</section>`;
    },
    lead: (content) => {
        return `<p class="lead">${content}</p>`;
    },
};
