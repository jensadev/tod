module.exports = function strip(str) {
    return str
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o');
};
