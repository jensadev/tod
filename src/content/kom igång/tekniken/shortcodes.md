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

{%- uppgifter "headinglead" -%}

{%- basic %}

#### Uppgift 1
Skapa en del och använd en shortcode.
#### Uppgift 2
Skapa en del och använd en paired shortcode.
{%- endbasic -%}

{%- extra %}
#### Uppgift 3
En otroligt svår uppgift eftersom den saknar instruktioner.
{%- endextra -%}

{%- enduppgifter -%}

{% facit "Hjälp" %}

Det här är innehåll för hjälpsektionen.

{% endfacit %}
