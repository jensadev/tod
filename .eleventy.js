const fs = require('fs');
const htmlmin = require('html-minifier');
const parseTransform = require('./src/transforms/parse-transform.js');
const markdownLibrary = require('./config/plugins/markdown');

const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const {
    filterNavPages,
    filterPages,
    readableDate,
    htmlDateString,
    slugUrl,
    fixTestsPages,
    next,
    prev,
    splice,
} = require('./config/filters/index.js');

const {
    image,
    youtube,
    svg,
    year,
    star,
    stars,
} = require('./config/shortcodes/index.js');

const {
    instructions,
    questions,
    base,
    advanced,
    extra,
    lead,
    hint,
} = require('./config/shortcodes/tod.js');

const { content } = require('./config/collections/index.js');

const { searchFilter } = require('./config/filters/search-filter.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (eleventyConfig) => {
    eleventyConfig.addWatchTarget('./src/sass/');
    eleventyConfig.addWatchTarget('./src/js/');

    // plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(emojiReadTime, {
        emoji: '📕',
        label: 'minuters läsning',
        wpm: 160,
        bucketSize: 3,
    });

    // Filters
    eleventyConfig.addFilter('filterNavPages', filterNavPages);
    eleventyConfig.addFilter('filterPages', filterPages);
    eleventyConfig.addFilter('readableDate', readableDate);
    eleventyConfig.addFilter('htmlDateString', htmlDateString);
    eleventyConfig.addFilter('slugUrl', slugUrl);
    eleventyConfig.addFilter('fixTestsPages', fixTestsPages);
    eleventyConfig.addFilter('next', next);
    eleventyConfig.addFilter('prev', prev);
    eleventyConfig.addFilter('splice', splice);
    eleventyConfig.addFilter('searchFilter', searchFilter);

    // Shortcodes
    eleventyConfig.addShortcode('youtube', youtube);
    eleventyConfig.addShortcode('svg', svg);
    eleventyConfig.addShortcode('year', year);
    eleventyConfig.addShortcode('star', star);
    eleventyConfig.addShortcode('stars', stars);

    eleventyConfig.addNunjucksAsyncShortcode('image', image);

    eleventyConfig.addPairedShortcode('instructions', instructions);
    eleventyConfig.addPairedShortcode('questions', questions);
    eleventyConfig.addPairedShortcode('base', base);
    eleventyConfig.addPairedShortcode('advanced', advanced);
    eleventyConfig.addPairedShortcode('extra', extra);
    eleventyConfig.addPairedShortcode('lead', lead);
    eleventyConfig.addPairedShortcode('hint', hint);

    // Collections
    eleventyConfig.addCollection('tod', content);

    // Markdown
    eleventyConfig.setLibrary('md', markdownLibrary);

    // Transform that parses HTML for TOD json
    eleventyConfig.addTransform('parse', parseTransform);

    // 404
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: (err, bs) => {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('public/404.html');
                    // Add 404 http status code in request header.
                    res.writeHead(404, {
                        'Content-Type': 'text/html; charset=UTF-8',
                    });
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    // Minify
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (outputPath.indexOf('.html') > -1) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
            });
            return minified;
        }
        return content;
    });

    // Copy assets to public directory
    eleventyConfig.addPassthroughCopy('./src/assets/fonts');
    eleventyConfig.addPassthroughCopy({
        './src/assets/favicon.ico': '/favicon.ico',
    });
    eleventyConfig.addPassthroughCopy('./src/assets/icons');
    eleventyConfig.addPassthroughCopy('./src/service-worker.js');

    return {
        templateForms: ['njk', 'md'],
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'public',
        },
        passthroughFileCopy: true,
    };
};
