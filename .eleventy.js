const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const mila = require('markdown-it-link-attributes');
const markdownItAnchor = require('markdown-it-anchor');
const glob = require('fast-glob');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const fs = require('fs');

const parseTransform = require('./src/transforms/parse-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (eleventyConfig) => {
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(emojiReadTime, {
        emoji: '📕',
        label: 'minuters läsning',
        wpm: 160,
        bucketSize: 3,
    });

    eleventyConfig.addWatchTarget('./src/sass/');
    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addPassthroughCopy({'src/assets/robots.txt': 'robots.txt'});
    eleventyConfig.addPassthroughCopy('./src/assets/fonts');
    eleventyConfig.addPassthroughCopy({'./src/assets/favicon.ico': '/favicon.ico'});
    // eleventyConfig.addPassthroughCopy({'./src/assets/icons': 'icons'});

    // Filters
    glob.sync(['src/filters/*.js']).forEach((file) => {
        let filters = require('./' + file);
        Object.keys(filters).forEach((name) =>
            eleventyConfig.addFilter(name, filters[name])
        );
    });

    // get rid of help page for navigation / front page list
    eleventyConfig.addFilter('noHelp', (value) => {
        return value.filter((item) => item.key !== 'hjälp');
    });

    // Shortcodes
    glob.sync(['src/shortcodes/*.js']).forEach((file) => {
        let shortcodes = require('./' + file);
        Object.keys(shortcodes).forEach((name) => {
            if (name === 'image') {
                eleventyConfig.addNunjucksAsyncShortcode(
                    name,
                    shortcodes[name]
                );
            } else {
                eleventyConfig.addShortcode(name, shortcodes[name]);
            }
        });
    });

    // PairedShortcodes
    glob.sync(['src/paired-shortcodes/*.js']).forEach((file) => {
        let pairedShortcodes = require('./' + file);
        Object.keys(pairedShortcodes).forEach((name) =>
            eleventyConfig.addPairedShortcode(name, pairedShortcodes[name])
        );
    });

    // Collections
    eleventyConfig.addCollection('tod', (collection) => {
        return [...collection.getFilteredByGlob('./src/**/*.md')];
    });

    /* Markdown Overrides */
    let markdownLibrary = markdownIt({
        html: true,
    })
        .use(markdownItAnchor, {
            permalink: true,
            permalinkClass: 'anchor',
            permalinkSymbol: '#',
            permalinkSpace: false,
            permalinkBefore: false,
            level: [1, 2, 3],
            slugify: (s) =>
                s
                    .trim()
                    .toLowerCase()
                    .replace(/[\s+~\/]/g, '-')
                    .replace(/[().`,%·'"!?¿:@*]/g, ''),
        })
        .use(mila, {
            pattern: /^https:/,
            attrs: {
                target: '_blank',
                rel: 'noopener',
            },
        });
    eleventyConfig.setLibrary('md', markdownLibrary);

    eleventyConfig.setUseGitIgnore(false);

    // 404
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: (err, bs) => {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('dist/404.html');
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

    // Transforms
    eleventyConfig.addTransform('parse', parseTransform);

    return {
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist',
        },
        passthroughFileCopy: true,
    };
};
