import merge from '../utils/merge';
import deepSearch from '../utils/deepSearch';
import findPath from '../utils/findPath';
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

    findBy(name) {
        let result = deepSearch(this.storage, 'name', (k, v) => v === name);
        return result;
    }

    getTod(name) {
        // const result = this.findBy(name);
        const tod = findPath(this.storage, "name");
        console.log(tod)
        // const result = this.find(tod[0], tod[1], tod[2]);
        // console.log(result);
        // checkCompleted(result, 'basic');
    }

    updateArea(theme, area, completed) {
        let areaResult = this.find(theme, area);
        if (areaResult.completed !== completed) {
            areaResult.completed = completed;
            areaResult.date = Date.now();
            console.log(areaResult);
            this.save();
        }
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
        const result = check.total === check.completed
        if (check.total > 0) return result;
        return false;
    }

    getThemes() {
        return this.storage.themes;
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
