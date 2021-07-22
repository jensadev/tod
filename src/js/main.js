// import { home } from './home';
// import { assignments } from './assignments';
// import { siteSearch } from './search';
const {home} = require('./home');
const {assignments} = require('./assignments');
const { siteSearch } = require ('./search');

window.addEventListener('load', () => {
    home();
    assignments();
    siteSearch();
});