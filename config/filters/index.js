const { format, parseISO } = require('date-fns');
const { sv } = require('date-fns/locale');
const slugify = require('slugify');

const filtered = [
    '',
    'hjälp',
    'tack',
    '404',
    'frågor',
    'offline',
    'questions',
    'översikt',
    'hjalp',
];

const readableDate = (dateObj) => {
    if (typeof dateObj === 'string') {
        dateObj = parseISO(dateObj);
    }
    return format(dateObj, 'PP', { locale: sv });
};

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
const htmlDateString = (dateObj) => {
    if (typeof dateObj === 'string') {
        dateObj = parseISO(dateObj);
    }
    return format(dateObj, 'yyyy-MM-dd');
};

const filterNavPages = (value) => {
    return value.filter((item) => !filtered.includes(item.key));
};

const filterPages = (value) => {
    return filtered.includes(value);
};

const slugUrl = (str) => {
    return slugify(str, {
        lower: true,
        strict: false,
        remove: /["]/g,
    });
};

const sortArray = (array, property, direction = 1) => {
    array.sort(function compare(a, b) {
        let comparison = 0;
        if (a[property] > b[property]) {
            comparison = 1 * direction;
        } else if (a[property] < b[property]) {
            comparison = -1 * direction;
        }
        return comparison;
    });
    return array; // Chainable
};

const fixTestsPages = (pages) => {
    let result = pages.map((page) => {
        let temp = {};
        temp.title = page.data.title;
        temp.excerpt = page.data.eleventyNavigation.excerpt;
        temp.url = page.url;
        temp.order = page.data.order;
        return temp;
    });
    return sortArray(result, 'order');
};

const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const next = (array, current) => {
    const currentIndex = array.findIndex((page) => page.url === current);
    return array[currentIndex + 1];
};
const prev = (array, current) => {
    const currentIndex = array.findIndex((page) => page.url === current);
    return array[currentIndex - 1];
};
const splice = (path) => {
    return path.replace('/content/', '/').split('/').slice(0, -1).join('/');
};

module.exports = {
    filterNavPages,
    filterPages,
    readableDate,
    htmlDateString,
    slugUrl,
    fixTestsPages,
    next,
    prev,
    splice,
};
