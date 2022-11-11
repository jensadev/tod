---
title: Slutuppgift tekniken
eleventyNavigation:
    key: slutuppgift tekniken
    parent: tekniken
    order: 100
    excerpt: Efter att du avslutat arbetet med området Tekniken kan du göra slutuppgiften för att pröva dina kunskaper.
    test: true
---

För att avsluta området så ska du kombinera det du hittills arbetat med i en slutuppgift.

## Instruktioner

Utför ditt arbete i temat [Test tema](/test-tema). Du ska där testa att använda de olika delarna från det här området, [Tekniken](/tekniken).

Börja med att skapa ett område, i test tema. Området ska heta Tekniktest. 
1. Döp en mapp till ```tekniktest```.
2. Skapa en fil i mappen som heter ```index.md```. Filen kan du kopiera från Test område. Var noga med att redigera filen så att den innehåller rätt information.

{% raw %}
```markdown
---
title: Tekniktest
layout: 'layouts/theme-area.njk'
category: område
permalink: '{{ page.filePathStem | splice | slugUrl }}/'
eleventyNavigation:
    key: tekniktest
    parent: test tema
    order: 1
    excerpt: Slutuppgiften att testa tekniken.
---


```
{% endraw %}

3. Skapa sedan en json data-fil för ditt område. Filen måste heta samma som mappen, ```tekniktest.json```. Som tidigare kan du kopiera materialet från Test område.

```json
{
    "tags": "test",
    "category": "del",
    "layout": "layouts/part.njk",
    "permalink": "{{ page.filePathStem | splice | slugUrl }}/{{ title | slug }}/"
}
```

4. Du kan nu skapa en md fil för din del. Döp filen till ```tekniktest del ett.md```. Filen ska ligga i mappen ```tekniktest```. Filen ska innehålla följande:

{% raw %}
```markdown
---
title: Tekniktest del ett
eleventyNavigation:
    key: tekniktest del ett
    parent: tekniktest
    order: 1
    excerpt: Arbetsfil för slutuppgift tekniken.
---

{% intro %}

Text för introduktion.

### Tänk på

- Punktlista

{% endintro %}

{% instruktioner %}

Text för instruktioner.

{% endinstruktioner %}

{% uppgifter %}

{% bas %}

#### Uppgift 1

Instruktion för uppgift.

{% endbas %}

{% enduppgifter %}
```
{% endraw %}

Den här filen är ett skelett för att skapa en del. Det är nu din uppgift att fylla filen med innehåll. Passa även på att använda de olika delarna som finns i området Tekniken för att presentera din uppgift.

### Tips

Det kan hjälpa att planera materialet först.
