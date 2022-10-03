export default class Storage {
    constructor(subject) {
        this.subject = subject;

        let storage = JSON.parse(window.localStorage.getItem(this.subject));

        if (!storage) {
            storage = {
                subject: this.subject,
                assignments: [],
            };
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
        console.log(theme, area, part);
        let result;
        // if (theme) {
        //     // result = this.storage.themes.find((t) => t.theme === theme);
        //     result = this.storage.assignments.find(
        //         (a) => a.theme === theme && a.area === null && a.part === null
        //     );
        // }
        // if (area) {
        //     result = result.areas.find((a) => a.area === area);
        // }
        // if (part) {
        //     return result.parts.find((p) => p.part === part);
        // }
        if (assignment) {
            return this.storage.assignments.find(
                (a) =>
                    a.theme === theme &&
                    a.area === area &&
                    a.part === part &&
                    a.assignment === assignment
            );
        }

        return result;
    }

    getAssignment(theme, area, part, assignment) {
        const result = this.find(theme, area, part, assignment);
        return result;
    }

    addAssignment(theme, area, part, assignment) {
        const newAssignment = {
            theme,
            area,
            part,
            assignment,
            completed: false,
            date: null,
        };
        this.storage.assignments.push(newAssignment);
        this.save();
        return newAssignment;
    }

    updateAssignment(theme, area, part, assignment) {
        const result = this.find(theme, area, part, assignment);
        if (result) {
            result.completed = !result.completed;
            result.date = Date.now();
        }
        this.save();
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
