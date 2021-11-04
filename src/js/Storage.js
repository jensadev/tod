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
            storage = _merge(storage, data);
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
            result = _find(['name', theme], this.storage.themes);
        }
        if (area) {
            result = _find(['name', area], result.areas);
        }
        if (part) {
            result = _find(['name', part], result.parts);
        }
        return result;
    }

    updateAssignment(theme, area, part, assignment) {
        let partResult = this.find(theme, area, part);
        let result = _find(assignment, partResult.assignments);
        result.completed = !result.completed;
        this.save();
    }

    checkCompleted(status, type) {
        let count = _filter(
            {
                type: type
            },
            status.assignments
        );
        let completed = _filter(
            {
                completed: true,
                type: type
            },
            status.assignments
        );

        return count.length === completed.length;
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
