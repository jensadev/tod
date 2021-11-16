// modified from https://stackoverflow.com/questions/15523514/find-by-key-deep-in-a-nested-array
const deepSearch = (object, key, predicate) => {
    // if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) {
    if (
        Object.prototype.hasOwnProperty.call(object, key) &&
        predicate(key, object[key]) === true
    ) {
        return object;
    }

    for (let i = 0; i < Object.keys(object).length; i++) {
        const nextObject = object[Object.keys(object)[i]];
        if (nextObject && typeof nextObject === 'object') {
            const o = deepSearch(nextObject, key, predicate);
            if (o != null) return o;
        }
    }
    return null;
};

export { deepSearch };
