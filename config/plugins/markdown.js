const slugify = require('slugify');
const markdownIt = require('markdown-it');
const markdownItLink = require('markdown-it-link-attributes');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttr = require('markdown-it-attrs');
const markdownitAbbr = require('markdown-it-abbr');

const linkInsideHeader = markdownItAnchor.permalink.linkInsideHeader({
    class: 'anchor',
    symbol: '<span hidden>#</span>',
    style: 'aria-labelledby',
    placement: 'before',
});

const markdownItAnchorOptions = {
    level: [1, 2, 3],
    slugify: (str) =>
        slugify(str, {
            lower: true,
            strict: true,
            remove: /["]/g,
        }),
    tabIndex: false,
    permalink(slug, opts, state, idx) {
        state.tokens.splice(
            idx,
            0,
            Object.assign(new state.Token('div_open', 'div', 1), {
                // Add class "header-wrapper [h1 or h2 or h3]"
                attrs: [['class', `heading-wrapper ${state.tokens[idx].tag}`]],
                block: true,
            })
        );

        state.tokens.splice(
            idx + 4,
            0,
            Object.assign(new state.Token('div_close', 'div', -1), {
                block: true,
            })
        );

        linkInsideHeader(slug, opts, state, idx + 1);
    },
};

const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
})
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItLink, {
        pattern: /^https:/,
        attrs: {
            target: '_blank',
            rel: 'noopener',
        },
    })
    .use(markdownItAttr, {
        allowedAttributes: ['id', 'class'],
    })
    .use(markdownitAbbr);

module.exports = markdownLibrary;
