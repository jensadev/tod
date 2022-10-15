---
title: Front matter
eleventyNavigation:
    key: front matter
    parent: tekniken
    order: 4
    excerpt: Beskriver extra information om kurswebbens sidor
---

{% intro %}

Varje sida i din kurs struktur är baserad på Markdown filer. Dessa filer innehåller
något som kallas front matter.
Det är information till templat-motorn som bygger sidan.
Front matter skapar strukturen, navigationen och placerar filen på rätt ställe.

### Tänk på

-   Front matter måste finnas med i .md filerna
-   Formatteringen
-   eleventyNavigation är det som styr navigeringen på sidan

{% endintro %}

{% instruktioner %}

Den här sidans front matter ser ut som följer.
**Det är front matter för en del.**

-   title: sidans titel, som du vill att den ska visas
-   eleventNavigation:
    -   key: används för navigationen, små bokstäver
    -   parent: måste vara satt till det index och den mapp som delen ligger i
    -   order: navigationsordningen, kan skippas
    -   excerpt: valfri, en kort beskrivning av delen

```md
---
title: Front matter
eleventyNavigation:
    key: front matter
    parent: tekniken
    order: 3
    excerpt: Förklaring av front matter
---
```

Utöver detta så lägger 11ty till front matter för delarna baserat på `.json` filen i foldern
med samma namn. Den här delen som hör till tekniken ärver alltså front matter från
`tekniken.json`.

Detta används för varje område och styr delarna i området.
Filen måste vara med och du behöver döpa den till området.
Redigera sedan värdet för `tags`. Är det flera taggar så används en array, `["tag", "tag"]`.

```json
{
    "tags": "tekniken",
    "category": "del",
    "layout": "part.njk",
    "permalink": "{{ page.filePathStem | splice | slugUrl }}/{{ title | slug }}.html"
}
```

{% endinstruktioner %}

{% uppgifter %}

{% bas %}

#### Uppgift 1

Kolla igenom front matter för en eller flera delar

#### Uppgift 2

Kolla igenom front matter för tema, område

{% endbas %}

{% enduppgifter %}
