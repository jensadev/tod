const slugify = require('slugify');

module.exports = {
    slugUrl: (str) =>
        slugify(str, {
            lower: true,
            strict: false,
            remove: /["]/g,
        }),
};
