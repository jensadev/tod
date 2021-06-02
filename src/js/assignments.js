/** look away 💩 **/
let storage, part, subject, assignmentsElements, extra, area;

const strip = (str) => str.trim().toLowerCase().replace(/ /g, '');

const checkAssignmentExists = (arr, id) => {
    let check = -1;
    arr.forEach((element, index) => {
        if (element.id === id) check = index;
    });
    return check;
};

const format = (str) => [str.slice(0, -1), ' ', str.slice(-1)].join('');

const checkAssignmentsStatus = (arr, supposedLength) => {
    let count = 0;
    arr.forEach(element => {
        if (element.completed === true) count += 1;
    });
    return supposedLength === count ? true : false;
};

const createLabel = (text) => {
    const label = document.createElement('label');
    label.classList.add('visually-hidden')
    label.setAttribute('for', text);
    label.textContent = `Jag är klar med ${format(text)}`;
    return label;
}

const createCheckbox = (id, type) => {
    const input = document.createElement('input');
    input.type = "checkbox";
    input.name = id;
    input.id = id;

    let index = checkAssignmentExists(storage[area][part][type], id);

    if (index !== -1 && storage[area][part][type][index].completed) {
        input.checked = true;
    }

    input.addEventListener('click', (e) => {
        if (confetti && input.checked) {
            confetti();
        }
        let index = checkAssignmentExists(storage[area][part][type], id);
        if (index === -1) {
            let temp = {
                id: e.target.id,
                completed: true,
                date: Date.now()
            };
            storage[area][part][type].push(temp);
        } else {
            storage[area][part][type][index].completed = storage[area][part][type][index].completed ? false : true;
            storage[area][part][type][index].date = Date.now();
        }

        if (type === 'basic' && extra) {
            if (checkAssignmentsStatus(storage[area][part][type], assignmentsElements.basic.length)) {
                extra.classList.add('visible');
                extra.classList.remove('invisible');
            } else {
                extra.classList.remove('visible');
                extra.classList.add('invisible');
            }
        }
        window.localStorage.setItem(subject, JSON.stringify(storage));
    });
    return input;
}

const getAssignments = (container) => {
    let basicAssignments = [];
    let extraAssignments = [];
    let extra = false;
    container.childNodes.forEach(element => {
        if (element.textContent.toLowerCase().search('⭐⭐') !== -1) {
            extra = true;
        }
        if (element.textContent.toLowerCase().search('uppgift') !== -1) {
            if (element.tagName === 'DIV') {
                element.childNodes.forEach(child => {
                    if (child.tagName !== 'H4') return;
                    extraAssignments.push(child);
                })
            }
            if (element.tagName !== 'H4') return;
            basicAssignments.push(element);
        }
    });
    return {
        basic: basicAssignments,
        extra: extraAssignments
    };
}

window.addEventListener('load', () => {
    const title = document.title.split('-');
    subject = strip(title[1]);
    part = strip(title[0]);
    area = strip(document.querySelector('#area').textContent);
    const assignmentsContainer = document.querySelector('.assignments')
    if (!assignmentsContainer) return;
    extra = assignmentsContainer.querySelector('.extra');

    assignmentsElements = getAssignments(assignmentsContainer);

    storage = JSON.parse(window.localStorage.getItem(subject));

    if (storage === null) {
        storage = {
            [area]: {
                [part]: {
                    basic: [],
                    extra: []
                }    
            }
        };
    } else {
        if(!storage[area]) {
            storage[area] = {};
        }
        if (!storage[area].hasOwnProperty(part)) {
            storage[area][part] = {};
            storage[area][part].basic = [];
            storage[area][part].extra = [];
        }
    }

    storage[area][part].assignments =  {
        basic: assignmentsElements.basic.length,
        extra: assignmentsElements.extra.length
    };

    if(extra) {
        if (checkAssignmentsStatus(storage[area][part].basic, assignmentsElements.basic.length) ) {
            extra.classList.add('visible');
            extra.classList.remove('invisible');
        } else {
            extra.classList.remove('visible');
            extra.classList.add('invisible');
        }    
    }

    assignmentsElements.basic.forEach(element => {
        element.classList.add('d-flex');
        element.classList.add('justify-content-between');
        element.classList.add('align-items-center');
        element.appendChild(createCheckbox(strip(element.textContent), 'basic'));
    });

    assignmentsElements.extra.forEach(element => {
        element.classList.add('d-flex');
        element.classList.add('justify-content-between');
        element.classList.add('align-items-center');
        element.appendChild(createCheckbox(strip(element.textContent), 'extra'));
    });

    const checkBoxElements = document.querySelectorAll('input');
    checkBoxElements.forEach(el => {
        el.insertAdjacentElement('beforebegin', createLabel(el.id));
    });
});