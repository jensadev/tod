---
title: Metadata
eleventyNavigation:
    key: metadata
    parent: tekniken
    order: 3
    excerpt: 
---
{% intro %}

## Introduktion

Sidans metadata sparas i en speciell javascript-fil. Denna behöver redigeras för
att sidans funktioner ska fungera.

### Tänk på
- 🛑 Ändra inte funktionerna i början av filen
- siteName i metadata måste stämma överrens med title i src/index.md
- Vill du välja färg för sidan, använd en färgkod i themeColor
- Sidan är i javascript, syntax är viktigt

{% endintro %}

{% instruktioner %}

## Instruktioner

🛑 Vänta med redigeringen av metadata tills du är klar med [Min kurs delen](../min-kurs/min-kurs.html) av guiden.

Öppna ```src/_data/meta.js``` för redigering.

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

🛑 Om du ändrat siteName så måste du även redigera title front matter i ```src/index.md```

🛑 siteName under eleventyNavigation skrivs i små bokstäver

```md
---
title: siteName
layout: "home.njk"
category: ämne
eleventyNavigation:
    key: siteName
---
```

{% endinstruktioner %}

{% uppgifter %}

## Uppgifter
### ⭐
#### Uppgift 1

Redigera och spara meta.js

#### Uppgift 2

Redigera titel i index.md

{% enduppgifter %}