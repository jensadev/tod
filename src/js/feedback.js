const feedback = () => {
    const fbOpen = document.querySelector('#feedback-open');
    const body = document.querySelector('body');

    fbOpen.addEventListener('click', () => {
        fbOpen.classList.toggle('disabled');
        fbOpen.disabled = true;
        const template = document.querySelector('template#feedback');
        const clone = template.content.cloneNode(true);
        clone.querySelector('#message').focus();
        body.appendChild(clone);
        const fbClose = document.querySelector('#feedback-close');
        fbClose.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#feedback-overlay').remove();
            fbOpen.classList.toggle('disabled');
            fbOpen.disabled = false;
        });
    });
};

export { feedback };
