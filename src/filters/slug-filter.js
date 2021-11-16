const slugify = require('slugify');

const slugUrl = (str) => {
    return slugify(str, {
        lower: true,
        strict: false,
        remove: /["]/g,
    });
};

module.exports = { slugUrl };
