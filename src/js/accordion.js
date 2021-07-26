const accordion = () => {
    const accordionElement = document.querySelector('#accordion');
    console.log(accordionElement);
    if (accordionElement === 'undefined') return;
    const accordionItems = accordionElement.querySelectorAll('.accordion__item');

    accordionItems.forEach((item) => {
        if(item.querySelector('h2')) return;
        item.addEventListener('click', () => {
            const button = item.querySelector('button');
            button.classList.toggle('active');
            const collapse = item.querySelector('.accordion__item-collapse');
            if (collapse.style.maxHeight) {
                collapse.style.maxHeight = null;
            } else {
                collapse.style.maxHeight = collapse.scrollHeight + "px";
            }
        });
    });
};

export { accordion };