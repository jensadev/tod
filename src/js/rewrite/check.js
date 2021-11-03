const checkAssignmentsStatus = (arr, supposedLength) => {
    let count = 0;
    arr.forEach(element => {
        if (element.completed === true) count += 1;
    });
    if (count === 0) return false;
    return supposedLength === count ? true : false;
};

const checkAssignmentExists = (arr, id) => {
    let check = -1;
    arr.forEach((element, index) => {
        if (element.id === id) check = index;
    });
    return check;
};

export { checkAssignmentsStatus, checkAssignmentExists };