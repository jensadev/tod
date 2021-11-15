const { format, parseISO } = require('date-fns');
const { sv } = require('date-fns/locale');

module.exports = {
    readableDate: (dateObj) => {
        if (typeof dateObj === 'string') {
            dateObj = parseISO(dateObj);
        }
        return format(dateObj, 'PP', { locale: sv });
    },

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    htmlDateString: (dateObj) => {
        if (typeof dateObj === 'string') {
            dateObj = parseISO(dateObj);
        }
        return format(dateObj, 'yyyy-MM-dd');
    },
};
