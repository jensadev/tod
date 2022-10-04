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
            const temp = this.data.themes.find((t) => t.theme === theme);
            result = temp ? temp : false;
        }
        if (area && result) {
            const temp = result.areas.find((a) => a.area === area);
            result = temp ? temp : false;
        }
        if (part && result) {
            const temp = result.parts.find((p) => p.part === part);
            result = temp ? temp : false;
        }
        if (assignment && result) {
            const temp = result.assignments.find(
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

    findAssignmentByID(id) {
        const temp = this.storage.assignments.find((a) => a.id === id);
        return temp ? temp : false;
    }

    getAssignments(theme, area, part) {
        const result = this.find(theme, area, part);
        return result ? result.assignments : false;
    }

    getAssignmentType(theme, area, part, assignment) {
        return find(theme, area, part, assignment).type;
    }

    // getAssignmentFromStorage(theme, area, part, assignment) {
    //     const result = this.findByID(hash(theme + area + part + assignment));
    //     return result;
    // }

    addAssignment(id, type) {
        const newAssignment = {
            id: id,
            type,
            completed: false,
            date: null,
        };
        this.storage.assignments.push(newAssignment);
        this.save();
        return newAssignment;
    }

    updateAssignment(id) {
        const result = this.findAssignmentByID(id);
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

    countAssignments(theme, area, part) {
        const assignments = this.getAssignments(theme, area, part);

        const result = {
            total: 0,
            basic: {
                total: 0,
                completed: 0,
            },
            extra: {
                total: 0,
                completed: 0,
            },
        };

        if (assignments) {
            result.total = assignments.length;
            for (const assignment of assignments) {
                if (assignment.type === 'basic') {
                    result.basic.total++;
                    const assignmentStatus = this.findAssignmentByID(
                        assignment.id
                    );
                    if (assignmentStatus.completed) {
                        result.basic.completed++;
                    }
                }
                if (assignment.type === 'extra') {
                    result.extra.total++;
                    const assignmentStatus = this.findAssignmentByID(
                        assignment.id
                    );
                    if (assignmentStatus.completed) {
                        result.extra.completed++;
                    }
                }
            }
            return result;
        }
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
