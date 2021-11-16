const minify = (input) => {
    return input.replace(/\s{2,}/g, '').replace(/'/g, '"');
};

module.exports = { minify };
