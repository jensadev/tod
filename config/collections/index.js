const content = (collection) => {
    return [...collection.getFilteredByGlob('./src/content/**/*.md')];
};

module.exports = {
    content,
};
