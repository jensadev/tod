const strip = (str) => {
    return str
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o');
};

const restore = (str) =>
    str.substring(0, 1).toUpperCase() + str.substring(1).replaceAll('-', ' ');

export { restore, strip };
