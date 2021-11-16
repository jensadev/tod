const elasticlunr = require('elasticlunr');

const search = (collection) => {
    // what fields we'd like our index to consist of
    let index = elasticlunr(function () {
        this.addField('title');
        this.addField('tags');
        this.addField('excerpt');
        this.setRef('id');
    });

    // loop through each page and add it to the index
    collection.forEach((page) => {
        let tags = page.template.frontMatter.data.tags
            ? page.template.frontMatter.data.tags.toString()
            : '';
        index.addDoc({
            id: page.url,
            title: page.template.frontMatter.data.title,
            tags: tags,
            excerpt: page.template.frontMatter.data.eleventyNavigation.excerpt,
        });
    });

    return index.toJSON();
};

module.exports = { searchFilter: search };
