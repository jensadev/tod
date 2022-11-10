const curated = [
    { p: '#484172', s: '#c4c4d5' },
    { p: '#0f7870', s: '#09ada2' },
    { p: '#597a87', s: '#e1e2c0' },
    { p: '#323130', s: '#ff9500' },
    { p: '#e36396', s: '#e1d3b9' },
    { p: '#635151', s: '#ac8f87' },
    { p: '#421a2a', s: '#b48598' },
    { p: '#ce0700', s: '#ff6b4e' },
    { p: '#44273b', s: '#fdf3e8' },
    { p: '#633370', s: '#b88690' },
    { p: '#ff0000', s: '#fcc' },
    { p: '#9a5a7b', s: '#d7b2a5' },
    { p: '#5483a1', s: '#524f59' },
    { p: '#7f122f', s: '#2a0003' },
    { p: '#374e4f', s: '#fed3a5' },
    { p: '#2f392e', s: '#e2d1b3' },
    { p: '#192929', s: '#f0f1f3' },
    { p: '#b52c2d', s: '#f5f0f6' },
    { p: '#a34993', s: '#ba5190' },
    { p: '#0d5160', s: '#6dceaa' },
    { p: '#edb244', s: '#fcf6e9' },
    { p: '#695353', s: '#f1efef' },
    { p: '#cce28e', s: '#7ead48' },
    { p: '#ff3535', s: '#30b6ff' },
    { p: '#5fdc81', s: '#f1b8e5' },
    { p: '#166b55', s: '#0ba845' },
    { p: '#1e7ea8', s: '#1d9dc4' },
    { p: '#4e867b', s: '' },
    { p: '#534899', s: '' },
    { p: '#344363', s: '' },
    { p: '#087b9d', s: '#88659d' },
    { p: '#0fc4c3', s: '#6775a8' },
];

/* Här nedanför kan du ändra */
module.exports = {
    // NOTE: `process.env.URL` is provided by Netlify, and may need
    // adjusted pending your host
    url: process.env.URL || 'http://localhost:8080',
    // page language
    language: 'sv',
    // Sidans namn, måste överrensstämma med src/index.md title front matter
    siteName: 'Ämnestitel',
    primaryColor: curated[0].p, // curated[0-31] pick or color string '#ff4e50'
    secondaryColor: curated[0].s, // pick or color string '#ff4e50'
    siteDescription:
        'Instruktionssida för siteskaparen för Tema Område Del, TOD.',
    author: {
        name: 'Jens Andreasson',
        email: 'jensandreasson77@gmail.com',
        url: 'https://jensa.dev',
    },
};
