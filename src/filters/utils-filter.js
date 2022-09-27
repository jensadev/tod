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

// const fixTestsPages = (object) => {
//     let result = [];
//     // key,  removed

//     for (const value of Object.entries(object)) {
//         console.log(value);
//         const temp = {};
//         temp.title = value.data.title;
//         temp.excerpt = value.data.eleventyNavigation.excerpt;
//         temp.url = value.url;
//         result.push(temp);
//     }
//     result = sortArray(result, 'order');
//     return result;
// };

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

module.exports = { capitalize, fixTestsPages, next, prev, splice };
