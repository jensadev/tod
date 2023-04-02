export default class Storage {
    constructor(subject, data) {
        this.subject = subject;
        this.data = data;
        this.version = 3;

        let storage = JSON.parse(window.localStorage.getItem(this.subject));

        const storageTemplate = {
            subject: this.subject,
            questions: [],
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

    find(theme, area, part, id) {
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
        if (id && result) {
            const temp = result.questions.find((a) => a.id === id);
            result = temp ? temp : false;
        }

        return result;
    }

    findQuestionByID(id, data = false) {
        if (!data) {
            const temp = this.storage.questions.find((a) => a.id === id);
            return temp ? temp : false;
        }
        const temp = this.data.themes.filter((t) => {
            return t.areas.find((a) => {
                return a.parts.find((p) => {
                    return p.questions.find((a) => a.id === id);
                });
            });
        });
        // from temp find theme, area, part and question
        if (temp.length > 0) {
            const theme = temp[0].theme;
            const area = temp[0].areas.filter((a) => {
                return a.parts.find((p) => {
                    return p.questions.find((a) => a.id === id);
                });
            })[0].area;
            const part = temp[0].areas
                .filter((a) => {
                    return a.parts.find((p) => {
                        return p.questions.find((a) => a.id === id);
                    });
                })[0]
                .parts.filter((p) => {
                    return p.questions.find((a) => a.id === id);
                })[0].part;
            const question = temp[0].areas
                .filter((a) => {
                    return a.parts.find((p) => {
                        return p.questions.find((a) => a.id === id);
                    });
                })[0]
                .parts.filter((p) => {
                    return p.questions.find((a) => a.id === id);
                })[0]
                .questions.filter((a) => a.id === id)[0];
            return {
                theme,
                area,
                part,
                question,
            };
        }
        return false;
    }

    getQuestions(theme, area, part) {
        const result = this.find(theme, area, part);
        return result ? result.questions : false;
    }

    createQuestion(id, type) {
        const newQuestion = {
            id: id,
            type,
            completed: false,
            date: null,
        };
        this.storage.questions.push(newQuestion);
        this.save();
        return newQuestion;
    }

    updateQuestion(id) {
        const result = this.findQuestionByID(id);
        if (result) {
            result.completed = !result.completed;
            result.date = Date.now();
        }
        this.save();
    }

    questionsStatus(theme, area, part) {
        const questions = this.getQuestions(theme, area, part);

        const result = {
            total: 0,
            base: {
                total: 0,
                completed: 0,
            },
            advanced: {
                total: 0,
                completed: 0,
            },
        };

        if (questions.length > 0) {
            result.total = questions.length;
            for (const question of questions) {
                if (question.type === 'base') {
                    result.base.total++;
                    const questionStatus = this.findQuestionByID(question.id);
                    if (questionStatus.completed) {
                        result.base.completed++;
                    }
                }
                if (question.type === 'advanced') {
                    result.advanced.total++;
                    const questionStatus = this.findQuestionByID(question.id);
                    if (questionStatus.completed) {
                        result.advanced.completed++;
                    }
                }
            }
            return result;
        }
        return false;
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
        let questionsCompleted = [];
        if (result) {
            for (const part of result.area.parts) {
                const check = this.questionsStatus(
                    result.theme,
                    result.area.area,
                    part.part
                );
                if (check) {
                    questionsCompleted.push(check);
                }
            }
        }
        let total = 0;
        let completed = 0;
        for (const question of questionsCompleted) {
            total += question.total;
            completed += question.base.completed;
        }
        return {
            total,
            completed,
            finished: total === completed,
        };
    }

    lastCompletedQuestion() {
        let completed = [];
        for (const question of this.storage.questions) {
            if (question.completed) {
                completed.push(question);
            }
        }
        if (completed.length > 0) {
            return completed.sort((a, b) => b.date - a.date)[0];
        }
        return false;
    }

    save() {
        window.localStorage.setItem(this.subject, JSON.stringify(this.storage));
    }
}
