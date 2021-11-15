/* eslint-disable no-invalid-this */
const elasticlunr = require('elasticlunr');

module.exports = {
    search: (collection) => {
        // what fields we'd like our index to consist of
        const index = elasticlunr(function () {
            this.addField('title');
            this.addField('tags');
            this.addField('excerpt');
            this.setRef('id');
        });

        // loop through each page and add it to the index
        collection.forEach((page) => {
            const tags = page.template.frontMatter.data.tags
                ? page.template.frontMatter.data.tags.toString()
                : '';
            index.addDoc({
                id: page.url,
                title: page.template.frontMatter.data.title,
                tags: tags,
                excerpt:
                    page.template.frontMatter.data.eleventyNavigation.excerpt,
            });
        });

        return index.toJSON();
    },
};
