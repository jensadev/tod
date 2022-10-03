const find = (data, tod, title) => {
    const [theme, area, part] = tod;

    let result = false;

    if (theme) {
        const temp = data.themes.find((t) => t.theme === theme);
        result = temp ? temp : false;
    }
    if (area) {
        const temp = result.areas.find((a) => a.area === area);
        result = temp ? temp : false;
    }
    if (part) {
        const temp = result.parts.find((p) => p.part === part);
        result = temp ? temp : false;
    }
    if (title) {
        const temp = result.assignments.find((a) => a.assignment === title);
        result = temp ? temp : false;
    }
    return result;
};

const getAssignmentType = (data, tod, title) => {
    return find(data, tod, title).type;
};

const numberOfAssignments = (storage, tod) => {
    // console.log(tod);
    const dataResult = find(storage.data, tod);

    const basicTotal = dataResult.assignments.filter(
        (a) => a.type === 'basic'
    ).length;

    const extraTotal = dataResult.assignments.filter(
        (a) => a.type === 'extra'
    ).length;

    const result = {
        total: dataResult.assignments.length,
    };

    if (basicTotal > 0) {
        result.basic = {
            total: basicTotal,
            completed: storage.countAssignments(...tod, 'basic', true),
        };
    }
    if (extraTotal > 0) {
        result.extra = {
            total: extraTotal,
            completed: storage.countAssignments(...tod, 'extra', true),
        };
    }

    return result;
};

export { getAssignmentType, numberOfAssignments };
