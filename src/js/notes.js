const notes = () => {
    const notesOpen = document.querySelector('#notes-open');
    const body = document.querySelector('body');

    notesOpen.addEventListener('click', () => {
        const template = document.querySelector('template#notes');
        const clone = template.content.cloneNode(true);
        clone.querySelector('#notes-area').focus();
        body.appendChild(clone);
        const notesClose = document.querySelector('#notes-close');
        notesClose.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#notes-overlay').remove();
        });
    });
};

export { notes };
