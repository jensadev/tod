const notes = () => {
    const notesOpen = document.querySelector('#notes-open');
    if (!notesOpen) return;
    const body = document.querySelector('body');

    let notes = localStorage.getItem('notes') || '{}';
    notes = JSON.parse(notes);

    notesOpen.addEventListener('click', () => {
        notesOpen.classList.toggle('disabled');
        notesOpen.disabled = true;
        const template = document.querySelector('template#notes');
        const clone = template.content.cloneNode(true);
        const textArea = clone.querySelector('#notes-area');
        if (notes[body.id]) {
            textArea.value = notes[body.id];
        }
        textArea.addEventListener('blur', () => {
            notes[body.id] = textArea.value;
            localStorage.setItem('notes', JSON.stringify(notes));
        });
        body.appendChild(clone);
        const notesClose = document.querySelector('#notes-close');
        notesClose.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#notes-container').remove();
            notesOpen.classList.toggle('disabled');
            notesOpen.disabled = false;
        });
    });
};

export { notes };
