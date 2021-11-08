import merge from '../utils/merge';
export default class Storage {
    constructor(data, subject) {
        this.data = data;
        this.subject = subject;

        let storage = JSON.parse(window.localStorage.getItem(this.subject));

        if (storage != null && !storage.subject) {
            console.error(
                'Corrupt data, cleaning up. Unfortunately progress will be reset.'
            );
            storage = null;
        }

        // adds new things to storage, if they don't exist
        storage = storage === null ? data : merge(storage, data);

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
            result = this.storage.themes.find((t) => t.theme === theme);
        }
        if (area) {
            result = result.areas.find((a) => a.area === area);
        }
        if (part) {
            result = result.parts.find((p) => p.part === part);
        }
        return result;
    }

    updateAssignment(theme, area, part, a) {
        let partResult = this.find(theme, area, part);
        const result = partResult.assignments.find(
            ({ assignment }) => assignment === a.assignment
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
