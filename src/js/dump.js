const strip = (str) => str.trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o');

window.addEventListener('load', () => {
    const span = document.querySelector('#title');
    const title = strip(span.textContent);


    let storage = localStorage.getItem(title);

    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(JSON.parse(storage), undefined, 2);

    span.insertAdjacentElement('afterend', pre);
})