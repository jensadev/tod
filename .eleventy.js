const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const mila = require('markdown-it-link-attributes');
const markdownItAnchor = require('markdown-it-anchor');
const glob = require('fast-glob');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const fs = require('fs');
const Image = require('@11ty/eleventy-img');
const mia = require('markdown-it-attrs');
const htmlmin = require('html-minifier');

const parseTransform = require('./src/transforms/parse-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

async function imageShortcode(
    src,
    alt,
    sizes = '(min-width: 30em) 50vw, 100vw'
) {
    const metadata = await Image(`./src/images/${src}`, {
        widths: [500, 1000, null],
        outputDir: './dist/img/',
    });

    const imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: 'inline',
    });
}

module.exports = (eleventyConfig) => {
    // eleventyConfig.setDataDeepMerge(true);
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

    eleventyConfig.addPassthroughCopy({
        'src/assets/robots.txt': 'robots.txt',
    });
    eleventyConfig.addPassthroughCopy('./src/assets/fonts');
    eleventyConfig.addPassthroughCopy({
        './src/assets/favicon.ico': '/favicon.ico',
    });
    eleventyConfig.addPassthroughCopy('./src/assets/icons');
    eleventyConfig.addPassthroughCopy('./src/manifest.json');
    eleventyConfig.addPassthroughCopy('./src/service-worker.js');

    // Filters
    glob.sync(['src/filters/*.js']).forEach((file) => {
        let filters = require('./' + file);
        Object.keys(filters).forEach((name) =>
            eleventyConfig.addFilter(name, filters[name])
        );
    });

    // filter filtered [pages] from navPages
    eleventyConfig.addFilter('filterNavPages', (value) => {
        const filtered = ['hjälp', 'tack'];
        return value.filter((item) => !filtered.includes(item.key));
    });

    // Shortcodes
    glob.sync(['src/shortcodes/*.js']).forEach((file) => {
        let shortcodes = require('./' + file);
        Object.keys(shortcodes).forEach((name) => {
            eleventyConfig.addShortcode(name, shortcodes[name]);
        });
    });

    eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

    // PairedShortcodes
    glob.sync(['src/paired-shortcodes/*.js']).forEach((file) => {
        let pairedShortcodes = require('./' + file);
        Object.keys(pairedShortcodes).forEach((name) =>
            eleventyConfig.addPairedShortcode(name, pairedShortcodes[name])
        );
    });

    // Collections
    eleventyConfig.addCollection('tod', (collection) => {
        return [...collection.getFilteredByGlob('./src/content/**/*.md')];
    });

    const markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
    })
        .use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.linkInsideHeader({
                symbol: `<span class="anchor" aria-hidden="true">#</span>`,
                placement: 'after',
            }),
            level: [1, 2],
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
        })
        .use(mia, {
            allowedAttributes: ['id', 'class'],
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

    return {
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
