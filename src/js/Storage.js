import _ from 'lodash';

export default class Storage {
    constructor(data, subject) {
        this.data = data;
        this.subject = subject;

        let storage = JSON.parse(window.localStorage.getItem(this.subject));
        if (storage === null) {
            storage = data;
        } else {
            storage = _.merge(data, storage);
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
            result = _.find(this.storage.themes, ['name', theme]);
        }
        if (area) {
            result = _.find(result.areas, ['name', area]);
        }
        if (part) {
            result = _.find(result.parts, ['name', part]);
        }
        return result;
    }

    updateAssignment(theme, area, part, assignment) {
        let partResult = this.find(theme, area, part);
        let result = _.find(partResult.assignments, assignment);
        result.completed = !result.completed;
        this.save();
    }

    checkCompleted(status, type) {
        let count = _.filter(status.assignments, {
            type: type
        });
        let completed = _.filter(status.assignments, {
            completed: true,
            type: type
        });

        return count.length === completed.length;
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
