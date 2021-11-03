import _find from 'lodash/fp/find';
import _filter from 'lodash/fp/filter';
import _merge from 'lodash/fp/merge';
export default class Storage {
    constructor(data, subject) {
        this.data = data;
        this.subject = subject;

        let storage = JSON.parse(window.localStorage.getItem(this.subject));
        if (storage === null) {
            storage = data;
        } else {
            storage = _merge(data, storage);
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

    find(theme, area, part) {
        let result;
        if (theme) {
            result = _find(this.storage.themes, ['name', theme]);
        }
        if (area) {
            result = _find(result.areas, ['name', area]);
        }
        if (part) {
            result = _find(result.parts, ['name', part]);
        }
        return result;
    }

    updateAssignment(theme, area, part, assignment) {
        let partResult = this.find(theme, area, part);
        let result = _find(partResult.assignments, assignment);
        result.completed = !result.completed;
        this.save();
    }

    checkCompleted(status, type) {
        let count = _filter(status.assignments, {
            type: type
        });
        let completed = _filter(status.assignments, {
            completed: true,
            type: type
        });

        return count.length === completed.length;
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
