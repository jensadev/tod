---
title: Skapa ett ämne
eleventyNavigation:
    key: skapa ett ämne
    parent: min kurs
    order: 2
    excerpt: Ämnessidan är introduktionen till kursen
---

{% intro %}

För att ändra ämne och innehåll på en kurssida så behöver du redigera sidans
metadata och ämnesindex.

### Tänk på

-   Metadata och ämnesindex titel måste överrensstämma
-   Om du ändrar i detta testrepo så kommer guiden sluta fungera

{% endintro %}

{% instruktioner %}

[Redigera metadata](../tekniken/metadata.html)

Redigera src/index.md

```md
---
title: Ämnestitel
layout: 'home.njk'
category: ämne
eleventyNavigation:
    key: ämnestitel
---

Din sidas text-innehåll
```

{% endinstruktioner %}

{% uppgifter %}

{% bas %}

{% endbas %}

{% enduppgifter %}
