---
title: Metadata
eleventyNavigation:
    key: metadata
    parent: tekniken
    order: 3
    excerpt: Sidans metadata är information till byggsystemet
---

{% intro %}

## Introduktion

Sidans metadata sparas i en speciell javascript-fil. Denna behöver redigeras för
att sidans funktioner ska fungera.

### Tänk på

-   🛑 Ändra inte funktionerna i början av filen
-   siteName i metadata måste stämma överrens med title i `src/index.md`
-   Vill du välja färg för sidan, ange en färgkod i themeColor
-   Sidan är i javascript, syntax är viktigt

{% endintro %}

{% instruktioner %}

## Instruktioner

🛑 När du redigerar metadata(`siteName:` egenskapen) så kommer guiden att sluta fungera.
Detta på grund av att temat [Kom igång](/kom-igang/kom-igang.html) är kopplat till `siteName: 'Ämnestitel'`.
Av den anledningen kan det vara klokt att kolla igenom
[Min kurs delen](../min-kurs/min-kurs.html) av guiden först.

Öppna `src/_data/meta.js` för redigering.

Redigera

-   siteName
-   themeColor
-   siteDescription
-   author

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
        url: '',
    },
};
```

🛑 Om du ändrat siteName så måste du även redigera title front matter i `src/index.md`.

🛑 key: siteName under eleventyNavigation skrivs i små bokstäver.

```md
---
title: siteName
layout: 'home.njk'
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

Redigera och spara `meta.js`.

#### Uppgift 2

Redigera titel i `index.md`.

{% enduppgifter %}

{% facit %}

#### Uppgift 1

Kontrollera så att du har startat Eleventys-byggsystem.

```bash
npm start
```

Efter att du redigerat filen och sparat så kommer din sida byggas på nytt.
Stämmer inte din metadata överrens med front matter i `index.md` så kommer byggscriptet
generera fel och din sida kommer inte byggas.

#### Uppgift 2

Om du redigerat key under eleventyNavigation och sparat så kommer byggscriptet
att köras igen. Om de nu stämmer överrens så bör sidan bygga utan problem.

Ladda sidan på [localhost](http://localhost:8080) och kontrollera att dina
senaste ändringar syns.

{% endfacit %}
