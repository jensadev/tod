const consent = (msgText, buttonText) => {
    const flash = document.querySelector('#flash-message');
    flash.classList.toggle('invisible');
    const inner = flash.querySelector('.flash__inner');
    const message = inner.querySelector('.flash__message');
    const button = document.createElement('button');
    button.classList.add('button', 'flash__button');
    button.textContent = buttonText;
    const p = document.createElement('p');
    p.textContent = msgText;
    message.appendChild(p);
    inner.appendChild(button);
    button.addEventListener('click', () => {
        localStorage.setItem('consent', 'true');
        flash.classList.toggle('invisible');
        location.reload();
    });
};

export { consent };
