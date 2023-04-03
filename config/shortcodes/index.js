// https://dev.to/extrabright/11ty-inject-svg-code-using-shortcodes-3l4m
const fs = require('fs');
const Image = require('@11ty/eleventy-img');

const getSvgContent = (file, classList) => {
    let relativeFilePath = `./src/assets/icons/${file}`;
    let data = fs.readFileSync(relativeFilePath, (err, contents) => {
        if (err) return err;
        return contents;
    });
    if (classList) {
        return (
            data.toString('utf8').slice(0, 4) +
            ` class="${classList}" ` +
            data.toString('utf8').slice(4)
        );
    } else {
        return data.toString('utf8');
    }
};

const year = () => {
    return `${new Date().getFullYear()}`;
};

const youtube = (id) => {
    return `<div class="youtube-embed">
    <iframe 
        src="https://www.youtube-nocookie.com/embed/${id}"
        title="YouTube video player"
        frameborder="0"
        allowfullscreen>
    </iframe>
    </div>`;
};

const imageShortcode = async (
    src,
    alt,
    sizes = '(min-width: 30em) 50vw, 100vw'
) => {
    const metadata = await Image(`./src/${src}`, {
        widths: [500, 1000],
        outputDir: './public/img/',
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
};

module.exports = {
    image: imageShortcode,
    youtube,
    year,
    svg: getSvgContent,
    star: () => {
        return `<span class="sr-only">Grundläggande uppgifter</span>${getSvgContent(
            'grade_FILL1_wght400_GRAD0_opsz24.svg'
        )}`;
    },
    stars: () => {
        return `<span class="sr-only">Extra uppgifter</span>${getSvgContent(
            'grade_FILL1_wght400_GRAD0_opsz24.svg'
        )}${getSvgContent('grade_FILL1_wght400_GRAD0_opsz24.svg')}`;
    },
};
