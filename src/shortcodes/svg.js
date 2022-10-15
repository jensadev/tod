// https://dev.to/extrabright/11ty-inject-svg-code-using-shortcodes-3l4m
const fs = require('fs');

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

module.exports = {
    svg: getSvgContent,
    star: () => {
        return `<span class="visually-hidden">Grundläggande uppgifter</span>${getSvgContent('grade_FILL1_wght400_GRAD0_opsz24.svg')}`;
    },
    stars: () => {
        return `<span class="visually-hidden">Extra uppgifter</span>${getSvgContent('grade_FILL1_wght400_GRAD0_opsz24.svg')}${getSvgContent('grade_FILL1_wght400_GRAD0_opsz24.svg')}`;
    },
};
