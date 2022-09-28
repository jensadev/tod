// https://dev.to/extrabright/11ty-inject-svg-code-using-shortcodes-3l4m
const fs = require('fs');

const getSvgContent = (file) => {
    let relativeFilePath = `./src/assets/icons/${file}`;
    let data = fs.readFileSync(relativeFilePath, (err, contents) => {
        if (err) return err;
        return contents;
    });

    return data.toString('utf8');
};

module.exports = {
    star: () => {
        return getSvgContent('grade_FILL1_wght400_GRAD0_opsz24.svg');
    },
};
