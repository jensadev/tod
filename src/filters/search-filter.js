const elasticlunr = require('elasticlunr');

const search = (collection) => {
    // what fields we'd like our index to consist of
    let index = elasticlunr(function () {
        this.setRef('id');
        this.addField('excerpt');
        this.addField('tags');
        this.addField('title');
    });

    // loop through each page and add it to the index
    collection.forEach((page) => {
        const excerpt = page.template.frontMatter.data.eleventyNavigation
            .excerpt
            ? page.template.frontMatter.data.eleventyNavigation.excerpt
            : '';
        let tags = page.template.frontMatter.data.tags
            ? page.template.frontMatter.data.tags.toString()
            : '';
        if (page.template.frontMatter.data.eleventyNavigation.test !== true) {
            index.addDoc({
                id: page.url,
                excerpt: excerpt,
                tags: tags,
                title: page.template.frontMatter.data.title,
            });
        }
    });

    return index.toJSON();
};

module.exports = { searchFilter: search };
