const feedback = () => {
    const fbClose = document.querySelector('#feedback-close');
    const fbOpen = document.querySelector('#feedback-open');
    const fbOverlay = document.querySelector('#feedback-overlay');

    fbClose.addEventListener('click', (e) => {
        e.preventDefault();
        fbOverlay.classList.toggle('feedback-overlay--active');
    });
    fbOpen.addEventListener('click', (e) => {
        e.preventDefault();
        fbOverlay.classList.toggle('feedback-overlay--active');
        const fbInput = document.querySelector('#message');
        fbInput.focus();
    });
};

export { feedback };
