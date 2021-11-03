const { accordion } = require('./accordion');
const { siteSearch } = require('./search');

const { setup } = require('./setup');

window.addEventListener('load', () => {
    accordion();
    siteSearch();
    setup();
});
