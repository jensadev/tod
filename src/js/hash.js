// https://gist.github.com/eplawless/52813b1d8ad9af510d85

function djb2_xor(str) {
    let len = str.length;
    let h = 5381;

    for (let i = 0; i < len; i++) {
        h = (h * 33) ^ str.charCodeAt(i);
    }
    return h >>> 0;
}

export { djb2_xor as hash };
