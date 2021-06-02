---
title: Metadata
eleventyNavigation:
    key: metadata
    parent: tekniken
    order: 2
    excerpt: 
---
{% intro %}

## Introduktion

Sidans metadata sparas i en speciell javascript-fil. Denna behöver redigeras för
att sidans funktioner ska fungera.

### Tänk på
- 🛑 Ändra inte funktionerna i början av filen
- Vill du välja färg för sidan, använd en färgkod i themeColor
- Sidan är i javascript, syntax är viktigt

{% endintro %}

{% instruktioner %}

## Instruktioner

Öppna src/_data/meta.js för redigering.

Redigera
- siteName
- themeColor
- siteDescription
- author

```js
module.exports = {
    // NOTE: `process.env.URL` is provided by Netlify, and may need
    // adjusted pending your host
    url: process.env.URL || 'http://localhost:8080',
    // page language
    language: 'sv',
    // Sidans namn, måste överrensstämma med src/index.md title front matter
    siteName: 'Ämnestitel',
    themeColor: pick, // pick or color string '#ff4e50'
    siteDescription:
        'Instruktionssida för siteskaparen för Tema Område Del, TOD.',
    author: {
        name: '',
        email: '',
        url: ''
    }
};
```


{% endinstruktioner %}

{% uppgifter %}

## Uppgifter
### ⭐
#### Uppgift 1

Redigera och spara meta.js

{% enduppgifter %}