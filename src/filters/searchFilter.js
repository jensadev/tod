const elasticlunr = require('elasticlunr');

module.exports = function (collection) {
    // what fields we'd like our index to consist of
    let index = elasticlunr(function () {
        this.addField('title');
        this.addField('excerpt');
        this.setRef('id');
    });

    // loop through each page and add it to the index
    collection.forEach((page) => {
        index.addDoc({
            id: page.url,
            title: page.template.frontMatter.data.title,
            excerpt: page.template.frontMatter.data.eleventyNavigation.excerpt,
        });
    });

    return index.toJSON();
};
