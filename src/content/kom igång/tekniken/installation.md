---
title: Installation
eleventyNavigation:
    key: installation
    parent: tekniken
    order: 1
    excerpt: Det första steget i att skapa din egen kurswebb
---

{% intro %}

Att skapa en kurs kräver att du har ett [GitHub](https://github.com/) konto och att du har viss
programvara installerad. Motorn finns som ett [templat repo](https://github.com/jensnti/tod)
på [GitHub](https://github.com/) som du klonar för att använda. Hittar du något fel,
eller vill föreslå en förbättring så kan du skicka ett [ärende](https://github.com/jensnti/tod/issues)
eller öppna en tråd i [forumet](https://github.com/jensnti/tod/discussions).
Väl mött!

### Sidan använder

-   [GitHub](https://github.com/) för att hosta koden
-   [Netlify](https://www.netlify.com/) som webbserver
-   [11ty](https://www.11ty.dev/) för att generera innehållet
-   [Markdown](https://www.markdownguide.org/) för att märka upp text

{% endintro %}

{% instruktioner %}

För att kunna följa instruktionerna så kommer du att behöva kunna använda
[GitHub](https://github.com/), köra [Node.js](https://nodejs.org/) och använda [npm](https://www.npmjs.com/).

[Klicka här för att skapa ett nytt repo från den här templaten](https://github.com/jensnti/tod/generate).

När repot är skapat så klonar du det till din dator med valfri GitHub klient.

```bash
cd reponame
```

För att kunna köras och generera sidan så är sidmotorn beroende av ett antal npm paket.
Paketen installeras genom att köra:

```bash
npm install
```

Det är fortfarande mycket att ändra på, men du ska nu kunna starta sidan med npm scriptet:

```bash
npm start
```

Förhoppningsvis kan du nu surfa till [localhost:8080](http://localhost:8080) och se en lokal
kopia av den här webbplatsen.

{% endinstruktioner %}

{% uppgifter %}

{% bas %}

#### Uppgift 1

Klona templaten.

#### Uppgift 2

Installera och kör npm script.

{% endbas %}

{% enduppgifter %}