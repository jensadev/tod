const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const slugify = require('slugify');
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");

module.exports = function (eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(emojiReadTime, {
        emoji: '📕',
        label: "minuters läsning",
        wpm: 160,
        bucketSize: 3,
      });

    eleventyConfig.addWatchTarget('./src/sass/');
    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addPassthroughCopy('./src/js');
    eleventyConfig.addPassthroughCopy('./src/images');
    eleventyConfig.addPassthroughCopy('./src/favicon.ico');

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addShortcode("youtube", (code) => {
        return `<div class="video-wrapper"><iframe 
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/${code}"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen></iframe></div>`;
    });

    eleventyConfig.addPairedShortcode('intro', function (content) {
        return `<section class="col-md-3 intro">${content}</section>`;
    });

    eleventyConfig.addPairedShortcode('instruktioner', function (content) {
        return `<section class="col-md-6 my-4 my-md-0 instructions">${content}</section>`;
    });

    eleventyConfig.addPairedShortcode('uppgifter', function (content) {
        return `<section class="col-md-3 assignments">${content}</section>`;
    });

    eleventyConfig.addPairedShortcode('extra', function (content) {
        return `<div class="extra">${content}</div>`;
    });

    eleventyConfig.addPairedShortcode('lead', function (content) {
        return `<p class="lead">${content}</p>`;
    });

    eleventyConfig.addFilter('splice', (path) => {
        return path.split('/').slice(0, -1).join('/');
    });

    eleventyConfig.addFilter("prev", (arr, currPage) => {
        const currentIndex = arr.findIndex((page) => page.url === currPage);
        return arr[currentIndex -1];
      });

      eleventyConfig.addFilter("next", (arr, currPage) => {
        const currentIndex = arr.findIndex((page) => page.url === currPage);
        return arr[currentIndex +1];
      });

    eleventyConfig.addFilter('capitalize ', (str) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    });

    eleventyConfig.addFilter('slugUrl', (str) => {
        return slugify(str, {
            lower: true,
            strict: false,
            remove: /["]/g,
          });
    });

    /* Markdown Overrides */
    let markdownLibrary = markdownIt({
        html: true
    })
    .use(markdownItAnchor, {
        permalink: true,
        permalinkClass: 'anchor',
        permalinkSymbol: '#',
        permalinkSpace: false,
        permalinkBefore: true,
        level: [1, 2, 3],
        slugify: (s) =>
            s
                .trim()
                .toLowerCase()
                .replace(/[\s+~\/]/g, '-')
                .replace(/[().`,%·'"!?¿:@*]/g, '')
    });
    eleventyConfig.setLibrary('md', markdownLibrary);

    return {
        dir: {
            input: 'src',
            output: 'public'
        }
    };
};
665