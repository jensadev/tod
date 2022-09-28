---
title: Filer
eleventyNavigation:
    key: filer
    parent: tekniken
    order: 2
    excerpt: Kurswebben har en bestämd filstruktur som måste följas för att den ska kunna byggas
---

{% intro %}

## Introduktion

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

## Instruktioner

🛑 Låt bli

✔️ Måste/kan redigeras

📁 Kom igång mappen innehåller material för den här guiden. Det är även en
mall för hur du skapar och konfigurerar din kurs.

```shell
.eleventy.js 🛑🔧 kärnan i byggsystemet och konfiguration för 11ty
.eleventyignore 🛑🙈 filer som ska ignoreras av 11ty
.git 🛑 git filer
.gitignore 🛑🙈 filer som ska ignoreras av git
.prettierrc 🔧 prettier konfiguration om du använder det
LICENSE 📄 GPL 3
node_modules/ 🛑📁 npm paketen
package.json 🛑🔨 script för att köra, installera och bygga
public/ 📁 här hamnar din sida när du kör/bygger den
src/ 📁 här finner du projektets filer
    _data/ 📁
        meta.js ✔️🔧 metadata för din sida, måste redigeras
    _includes/ 🛑📁 templater för projektets sidor
    _theme/ 🛑📁🔧
    dump.njk 🛑 templat
    favicon.ico 🛑✔️ favicon, redigera om du vill
    images/ ✔️📁🍱 spara bilder du använder här
    index.md ✔️📝 Ämnesindex, måste redigeras
    js/ 🛑📁 javascript för sidan
    kom igång/ ✔️📁 Tema i guiden
        index.md ✔️📝 Temaindex
        pedagogik/ ✔️📁 Område i guiden
        tekniken/ ✔️📁 Område i guiden
            filer.md ✔️📝 Del i området
            index.md ✔️📝 Områdesindex
            installation.md ✔️📝 Del i området
            tekniken.json ✔️🔧 områdeskonfiguration, måste redigeras
    sass/ 🛑💄 Stilmallar för sidan
    sitemap.xml.njk 🛑 templat för sitemap
```

{% endinstruktioner %}

{% uppgifter %}

## Uppgifter

### {% star %}

#### Uppgift 1

Kolla igenom projektets filer.

{% enduppgifter %}
