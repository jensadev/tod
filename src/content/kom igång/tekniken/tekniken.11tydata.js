module.exports = {
    tags: 'tekniken',
    category: 'del',
    layout: 'layouts/part.njk',
    permalink: '{{ page.filePathStem | replace("/content/", "/") | splice | slugUrl }}/'
}
