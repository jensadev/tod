module.exports = function deepSearchByKey(object, originalKey, matches = []) {
    if (object != null) {
        if (Array.isArray(object)) {
            for (let arrayItem of object) {
                deepSearchByKey(arrayItem, originalKey, matches);
            }
        } else if (typeof object == 'object') {
            for (let key of Object.keys(object)) {
                if (key == originalKey) {
                    matches.push(object);
                } else {
                    deepSearchByKey(object[key], originalKey, matches);
                }
            }
        }
    }

    return matches;
};
