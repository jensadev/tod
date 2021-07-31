const { home } = require('./home');
const { accordion } = require('./accordion');
const { assignments } = require('./assignments');
const { siteSearch } = require('./search');

window.addEventListener('load', () => {
    home();
    accordion();
    assignments();
    siteSearch();
});
