---
title: Filer
eleventyNavigation:
    key: filer
    parent: tekniken
    order: 2
    excerpt: Kurswebben har en bestämd filstruktur som måste följas för att den ska kunna byggas
---

{% intro %}

Det här projektet innehåller ett större antal filer för att möjliggöra dess funktion.
De filer du faktiskt behöver ändra på för att skapa din kurs kommer att förklaras under
området [Min kurs](/kom-igang/min-kurs/).

Den här delens funktion är enbart en kort introduktion.

### Tänk på

-   Sidan byggs programmerbart
-   Det är viktigt med stora och små bokstäver
-   Små missar i konfigurationen kan göra att det inte fungerar
-   Fråga om du behöver hjälp

{% endintro %}

{% instruktioner %}

🛑 TODs systemfiler och kärna. Ändra inte på dessa.

✔️ Måste/kan redigeras

📁 Kom igång mappen innehåller material för den här guiden. Det är även en
mall för hur du skapar och konfigurerar din kurs.

```shell
dist/ 📁 här hamnar din sida när du kör/bygger den
node_modules/ 🛑📁 npm paketen, installerade av npm install
src/ 📁 här finner du projektets filer
    _data/ 📁
        meta.js ✔️🔧 metadata för din sida, måste redigeras
    _includes/ 🛑📁 templater för projektets sidor
    _theme/ 🛑📁🔧
    assets/ 🛑📁
    content/ 📁 Allt faktiskt innehåll i kursen, ta bort exempel och ersätt med eget
        kom igång/ ✔️📁 Tema i guiden
            index.md ✔️📝 Temaindex
            min kurs/ ✔️📁 Tema i guiden
            pedagogisk tanke/ ✔️📁 Område i guiden
            tekniken/ ✔️📁 Område i guiden
                filer.md ✔️📝 Del i området
                index.md ✔️📝 Områdesindex
                installation.md ✔️📝 Del i området
                tekniken.json ✔️🔧 områdeskonfiguration, måste redigeras
        slutuppgifter/ 🛑📁
            index.md 🛑📝 Index för slutuppgifter
            slutuppgifter.json 🛑🔧 Konfiguration för slutuppgifter
    images/ ✔️📁🍱 spara bilder du använder här
    js/ 🛑📁 javascript för sidan
    json/ 🛑📁 json filer för sidan
    paired-shortcodes/ 🛑📁 kortkoder för sidan
    sass/ 🛑💄 Stilmallar för sidan
    shortcodes/ 🛑📁 kortkoder för sidan
    transforms/ 🛑📁 transformeringar för sidan
    utils/ 🛑📁 hjälpfunktioner för sidan
    404.njk 🛑📝 404 sida
    hjälp.md 🛑📝 Hjälpsida
    index.md ✔️📝 Ämnesindex, måste redigeras
    search-index.json.njk 🛑📝 sökindex
    sitemap.xml.njk 🛑 templat för sitemap
    tack.md 🛑📝 Feedback sida
.eleventy.js 🛑🔧 kärnan i byggsystemet och konfiguration för 11ty
.eleventyignore 🛑🙈 filer som ska ignoreras av 11ty
.git 🛑 git filer
.gitignore 🛑🙈 filer som ska ignoreras av git
.prettierrc 🔧 prettier konfiguration om du använder det
LICENSE 📄 CC BY-NC 4.0
package.json 🛑🔨 script för att köra, installera och bygga
```

{% endinstruktioner %}

{% uppgifter %}

{% bas %}

#### Uppgift 1

Kolla igenom projektets filer.

{% endbas %}

{% enduppgifter %}
