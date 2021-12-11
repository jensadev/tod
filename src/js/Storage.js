/* eslint-disable require-jsdoc */
import { deepSearch } from './deep-search';
import { merge } from './merge';

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
            return result.parts.find((p) => p.part === part);
        }
        return result;
    }

    updateAssignment(theme, area, part, a) {
        const partResult = this.find(theme, area, part);
        const result = partResult.assignments.find(
            ({ assignment }) => assignment === a.assignment
        );
        result.completed = !result.completed;
        result.date = Date.now();
        this.save();
    }

    countAssignments(status, type) {
        const count = status.assignments.filter(
            (assignment) => assignment.type === type
        );
        const completed = status.assignments.filter(
            (assignment) =>
                assignment.completed === true && assignment.type === type
        );

        return {
            total: count.length,
            completed: completed.length,
        };
    }

    checkCompleted(status, type) {
        const check = this.countAssignments(status, type);
        if (check.total > 0) return check.total === check.completed;
        return false;
    }

    getThemes() {
        return this.storage.themes;
    }

    checkArea(name) {
        const result = deepSearch(
            this.getStorage(),
            'area',
            (k, v) => v === name
        );
        let completed = 0;
        result.parts.forEach((part) => {
            const test = this.checkCompleted(part, 'basic');
            if (test) {
                completed += 1;
            }
        });
        return completed === result.parts.length;
    }

    lastCompletedAssignment() {
        const themes = this.getThemes();
        let completed = [];
        themes.forEach((theme) => {
            theme.areas.forEach((area) => {
                area.parts.forEach((part) => {
                    part.assignments.forEach((assignment) => {
                        if (assignment.completed === true) {
                            completed.push({
                                theme: theme.theme,
                                area: area.area,
                                part: part.part,
                                assignment: assignment.assignment,
                                date: assignment.date,
                            });
                        }
                    });
                });
            });
        });
        return completed.sort((a, b) => b.date - a.date)[0];
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
