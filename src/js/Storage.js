import _merge from 'lodash/fp/merge';
export default class Storage {
    constructor(data, subject) {
        this.data = data;
        this.subject = subject;

        let storage = JSON.parse(window.localStorage.getItem(this.subject));

        if (storage != null && !storage.name) {
            console.error(
                'Corrupt data, cleaning up. Unfortunately progress will be reset.'
            );
            storage = null;
        }

        storage = storage === null ? data : _merge(data, storage);

        this.setStorage(storage);
        this.save();
    }

    getStorage() {
        return this.storage;
    }

    setStorage(data) {
        this.storage = data;
    }

    find(theme, area, part) {
        let result;
        if (theme) {
            result = this.storage.themes.find((t) => t.name === theme);
        }
        if (area) {
            result = result.areas.find((a) => a.name === area);
        }
        if (part) {
            result = result.parts.find((p) => p.name === part);
        }
        return result;
    }

    updateAssignment(theme, area, part, assignment) {
        let partResult = this.find(theme, area, part);
        const result = partResult.assignments.find(
            ({ name }) => name === assignment.name
        );
        result.completed = !result.completed;
        result.date = Date.now();
        this.save();
    }

    countAssignments(status, type) {
        let count = status.assignments.filter(
            (assignment) => assignment.type === type
        );
        let completed = status.assignments.filter(
            (assignment) =>
                assignment.completed === true && assignment.type === type
        );

        return {
            total: count.length,
            completed: completed.length
        };
    }

    checkCompleted(status, type) {
        let check = this.countAssignments(status, type);
        if (check.total > 0) return check.total === check.completed;
        return false;
    }

    getThemes() {
        return this.storage.themes;
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
