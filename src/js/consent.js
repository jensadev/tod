const consent = (msgText, buttonText) => {
    const template = document.querySelector('template#flash');
    const clone = template.content.cloneNode(true);
    // const flash = document.querySelector('#flash-message');
    // flash.classList.toggle('invisible');
    const inner = clone.querySelector('.flash__inner');
    const message = clone.querySelector('.flash__message');
    const button = document.createElement('button');
    button.classList.add('button', 'button--primary', 'flash__button');
    button.textContent = buttonText;
    const p = document.createElement('p');
    p.textContent = msgText;
    message.appendChild(p);
    inner.appendChild(button);
    const body = document.querySelector('body');
    body.appendChild(clone);
    button.addEventListener('click', () => {
        localStorage.setItem('consent', 'true');
        location.reload();
    });
};

export { consent };
