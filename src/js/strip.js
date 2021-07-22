const strip = (str) =>
    str
        .trim()
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o');

export { strip };
