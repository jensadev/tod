// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
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

module.exports = {
    fixTestsPages: (object) => {
        let result = [];
        // key,  removed
        for (const [key, value] of Object.entries(object)) {
            const temp = {};
            temp.title = value.data.title;
            temp.excerpt = value.data.eleventyNavigation.excerpt;
            temp.url = value.url;
            result.push(temp);
        }
        result = sortArray(result, 'order');
        return result;
    },
    capitalize: (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    next: (array, current) => {
        const currentIndex = array.findIndex((page) => page.url === current);
        return array[currentIndex + 1];
    },
    prev: (array, current) => {
        const currentIndex = array.findIndex((page) => page.url === current);
        return array[currentIndex - 1];
    },
    splice: (path) => {
        return path.split('/').slice(0, -1).join('/');
    },
};
