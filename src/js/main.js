const {home} = require('./home');
const {assignments} = require('./assignments');
const { siteSearch } = require ('./search');

window.addEventListener('load', () => {
    home();
    assignments();
    siteSearch();
});