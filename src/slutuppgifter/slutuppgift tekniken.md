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

Skapa ett html-dokument, `index.html`. I dokumentet ska du skapa följande element: `ul`, `input` och `button`.
Ge dessa element ett `#id` och en `.class`.

Ladda sedan in din din tidigare lösning där användaren fick gissa ett tal. Du ska nu använda dig av javascript för att välja DOM elementen och använda dessa till spelet istället för prompt och alert.

### Tips

Du väljer element från DOM. För input så kan du komma åt värdet med `inputelement.value`.
Du kommer att behöva lyssna på när användaren klickar på knappen och då läsa av inputelementets värde.

```js
button.addEventlistener('click', (e) => {
    const inputValue = inputElement.value;
    console.log(inputValue);
});
```

För att skriva ut meddelanden till användaren så ska nya li element skapas och läggas till i ul elementet.

```js
const li = document.createElement('li');
li.textContent = 'msg';
ul.appendChild(li);
```
