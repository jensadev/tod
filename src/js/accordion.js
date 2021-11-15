const accordion = () => {
    const accordionElement = document.querySelector('#accordion');
    if (accordionElement === 'undefined' || accordionElement === null) return;
    const accordionItems =
        accordionElement.querySelectorAll('.accordion__item');

    accordionItems.forEach((item) => {
        if (item.querySelector('h2')) return;
        const collapse = item.querySelector('.accordion__item-collapse');
        collapse.classList.add('mh-0');
        item.addEventListener('click', (e) => {
            if (e.target.nodeName === 'A') return;
            const button = item.querySelector('button');
            button.classList.toggle('active');
            if (collapse.style.maxHeight) {
                collapse.style.maxHeight = null;
            } else {
                collapse.style.maxHeight = `${collapse.scrollHeight}px`;
            }
        });
    });
};

export { accordion };
