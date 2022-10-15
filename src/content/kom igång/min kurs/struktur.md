---
title: Struktur
eleventyNavigation:
    key: struktur
    parent: min kurs
    order: 1
    excerpt: Kurswebben är byggd efter en satt struktur, den är viktig att följa för att systemet ska fungera
---

{% intro %}

En kurswebb består av ämne, teman, områden och delar. Detta är nära sammankopplat och
behöver följa en viss struktur och regler för att det ska fungera.

### Tänk på

-   Sidan som skapas är för ett ämne
-   Du kan ha flera teman
-   Teman kan bestå av flera områden
-   Områden kan bestå av flera delar

{% endintro %}

{% instruktioner %}

Studera strukturen för den här guiden.

-   Ämnet utgår från title i `src/index.md` och siteName i `_data/meta.js`
-   Ett tema är en mapp i `src/` med temats namn, ex. _kom igång_, i ett temas mapp hittar du
    -   `index.md` för temat med tema front matter
    -   Ett område, det är en mapp i temat, ex. _min kurs_, i ett områdes mapp hittar du
        -   `omådets namn.json` med front matter för delarna, ex. _min kurs.json_
        -   `index.md` för området med områdets front matter
        -   `del.md` där del är namnet på en del, ex. _struktur.md_

{% image "struktur.png", "Skärmdump av strukturen" %}

{% endinstruktioner %}

{% uppgifter %}

{% bas %}

#### Uppgift 1

Studera strukturen för den här guiden, temat kom igång
{% endbas %}
{% enduppgifter %}
