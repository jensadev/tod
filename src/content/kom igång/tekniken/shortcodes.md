---
title: Shortcodes
eleventyNavigation:
    key: shortcodes
    parent: tekniken
    order: 6
    excerpt: För att visa innehållet finns det ett antal shortcodes till hjälp
---

{% intro %}

## Introduktion

Shortcodes är en typ av funktioner som kan användas från MD filer för att till exempel lägga till ett HTML-element.

### Sidan använder

- Stuff
- More stuff

{% endintro %}

{% instruktioner %}

## Instruktioner

Instruktioner för hur du kan använda en shortcode.

{% raw %}
```md
{% shortcode paramas %}

{% paired-shortcode %}
content
{% endpaired-shortcode %}
```
{% endraw %}

{% endinstruktioner %}

{% uppgifter %}

## Uppgifter

### {% star %}

#### Uppgift 1

#### Uppgift 2

### {% star %}{% star %}

{% extra %}

#### Uppgift 3

{% endextra %}

{% enduppgifter %}

{% facit %}

Det här är text för hjälpsektionen.

{% endfacit %}
