import { hash } from './hash.js';
export default class Storage {
    constructor(subject, data) {
        this.subject = subject;
        this.data = data;
        this.version = 2.0;

        let storage = JSON.parse(window.localStorage.getItem(this.subject));

        const storageTemplate = {
            subject: this.subject,
            assignments: [],
            version: this.version,
        };

        if (!storage) {
            console.log('Creating new storage');
            storage = storageTemplate;
        }

        if (storage.version !== this.version) {
            console.log('Updating storage');
            storage = storageTemplate;
        }

        this.setStorage(storage);
        this.save();
    }

    getStorage() {
        return this.storage;
    }

    setStorage(data) {
        this.storage = data;
    }

    find(theme, area, part, assignment) {
        let result = false;
        if (theme) {
            const temp = this.storage.assignments.find(
                (t) => t.theme === theme
            );
            result = temp ? temp : false;
        }
        if (area) {
            const temp = this.storage.assignments.find((a) => a.area === area);
            result = temp ? temp : false;
        }
        if (part) {
            const temp = this.storage.assignments.find((p) => p.part === part);
            result = temp ? temp : false;
        }
        if (assignment) {
            const temp = this.storage.assignments.find(
                (a) =>
                    a.theme === theme &&
                    a.area === area &&
                    a.part === part &&
                    a.assignment === assignment
            );
            result = temp ? temp : false;
        }

        return result;
    }

    findByID(id) {
        const temp = this.storage.assignments.find((a) => a.id === id);
        return temp ? temp : false;
    }

    getAssignment(theme, area, part, assignment) {
        const result = this.findByID(
            hash(`${theme}-${area}-${part}-${assignment}`)
        );
        return result;
    }

    addAssignment(theme, area, part, assignment, type) {
        const newAssignment = {
            id: hash(`${theme}-${area}-${part}-${assignment}`),
            assignment,
            type,
            completed: false,
            date: null,
        };
        this.storage.assignments.push(newAssignment);
        this.save();
        return newAssignment;
    }

    updateAssignment(theme, area, part, assignment) {
        const result = this.findByID(
            hash(`${theme}-${area}-${part}-${assignment}`)
        );
        if (result) {
            result.completed = !result.completed;
            result.date = Date.now();
        }
        this.save();
    }

    // checkCompleted(status, type) {
    //     const check = this.countAssignments(status, type);
    //     if (check.total > 0) return check.total === check.completed;
    //     return false;
    // }

    countAssignments(theme, area, part, type, completed) {
        const result = this.storage.assignments.filter(
            (assignment) =>
                assignment.theme === theme &&
                assignment.area === area &&
                assignment.part === part
        );

        return result.filter(
            (assignment) =>
                assignment.type === type && assignment.completed === completed
        ).length;
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
