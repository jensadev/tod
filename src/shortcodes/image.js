/* eslint-disable require-jsdoc */
const img = require('@11ty/eleventy-img');

module.exports = {
    async image(src, alt, title, sizes = '100%') {
        const metadata = await img(src, {
            widths: [300, 600],
            outputDir: './dist/img/',
        });

        const imageAttributes = {
            alt,
            sizes,
            title,
            loading: 'lazy',
            decoding: 'async',
        };

        // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
        return img.generateHTML(metadata, imageAttributes, {
            whitespaceMode: 'inline',
        });
    },
};
