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
        // if (assignment && result) {
        //     const temp = result.assignments.find(
        //         (a) =>
        //             a.theme === theme &&
        //             a.area === area &&
        //             a.part === part &&
        //             a.assignment === assignment
        //     );
        //     result = temp ? temp : false;
        // }

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

    createAssignment(id, type) {
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

    assignmentsStatus(theme, area, part) {
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

    findAreaWithTheme(area) {
        const result = this.data.themes.filter((t) => {
            return t.areas.find((a) => a.area === area);
        });
        // only return matching area with theme
        if (result.length > 0) {
            return {
                theme: result[0].theme,
                area: result[0].areas.find((a) => a.area === area),
            };
        }
        return false;
    }

    areaStatus(area) {
        const result = this.findAreaWithTheme(area);
        let assignmentsCompleted = [];
        if (result) {
            for (const part of result.area.parts) {
                const check = this.assignmentsStatus(
                    result.theme,
                    result.area.area,
                    part.part
                );
                if (check) {
                    assignmentsCompleted.push(check);
                }
            }
        }
        let total = 0;
        let completed = 0;
        for (const assignment of assignmentsCompleted) {
            total += assignment.total;
            completed += assignment.basic.completed;
        }
        return {
            total,
            completed,
            finished: total === completed,
        };
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
