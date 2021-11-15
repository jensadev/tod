// from https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-3889214
module.exports = function merge(source, target) {
    for (const [key, val] of Object.entries(source)) {
        if (val !== null && typeof val === `object`) {
            if (target[key] === undefined) {
                target[key] = new val.__proto__.constructor();
            }
            merge(val, target[key]);
        } else {
            target[key] = val;
        }
    }
    return target; // we're replacing in-situ, so this is more for chaining than anything else
};
