const gist = (key, file) => {
    return `<script src="https://gist.github.com/${key}.js?file=${file}"> </script>`;
};

module.exports = gist;
