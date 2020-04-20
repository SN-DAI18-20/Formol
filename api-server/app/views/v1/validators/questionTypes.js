const moment = require('moment');

function items_validator(payload) {
    if (!Object.keys(payload.parameters).includes('items')) {
        throw new Error('items should be present.');
    } else if (!Array.isArray(payload.parameters.items)) {
        throw new Error('items should be an array.');
    }

    if (payload.parameters.items.length < 2) {
        throw new Error('items should contains two elements minimum.');
    }
}

function sanitize_additionnals(keys, payload) {
    const parameters = {};

    keys.forEach(key => {
        if (Object.keys(payload.parameters).includes(key)) {
            parameters[key] = payload.parameters[key];
        }
    });

    payload.parameters = parameters;

    return payload;
}

function checkbox(payload) {
    const allowed_keys = ['items'];

    items_validator(payload);

    return sanitize_additionnals(allowed_keys, payload);
}

function date(payload) {
    const allowed_keys = ['min_date', 'max_date'];

    if (Object.keys(payload.parameters).includes('min_date')) {
        const date = moment(
            payload.parameters.min_date,
            moment.ISO_8601
        ).format();

        if (
            payload.parameters.min_date == null ||
            payload.parameters.min_date == false
        ) {
            delete payload.parameters.min_date;
        } else if (date == 'Invalid date') {
            throw new Error(`min_date is not in ISO8601 format.`);
        }
    }

    if (Object.keys(payload.parameters).includes('max_date')) {
        const date = moment(
            payload.parameters.max_date,
            moment.ISO_8601
        ).format();

        if (
            payload.parameters.max_date == null ||
            payload.parameters.max_date == false
        ) {
            delete payload.parameters.max_date;
        } else if (date == 'Invalid date') {
            throw new Error(`max_date is not in ISO8601 format.`);
        }
    }

    return sanitize_additionnals(allowed_keys, payload);
}

function number(payload) {
    const allowed_keys = ['min', 'max'];

    if (Object.keys(payload.parameters).includes('min')) {
        if (payload.parameters.min == null || payload.parameters.min == false) {
            delete payload.parameters.min;
        } else if (typeof payload.parameters.min !== 'number') {
            throw new Error(`min is not a number.`);
        }
    }

    if (Object.keys(payload.parameters).includes('max')) {
        if (payload.parameters.max == null || payload.parameters.max == false) {
            delete payload.parameters.max;
        } else if (typeof payload.parameters.max !== 'number') {
            throw new Error(`max is not a number.`);
        }
    }

    console.error(payload);
    return sanitize_additionnals(allowed_keys, payload);
}

function range(payload) {
    const allowed_keys = ['min', 'max'];

    if (!Object.keys(payload.parameters).includes('min')) {
        throw new Error(`min should be present.`);
    } else if (typeof payload.parameters.min !== 'number') {
        throw new Error(`min is not a number.`);
    }

    if (!Object.keys(payload.parameters).includes('max')) {
        throw new Error(`max should be present.`);
    } else if (typeof payload.parameters.max !== 'number') {
        throw new Error(`max is not a number.`);
    }

    return sanitize_additionnals(allowed_keys, payload);
}

function selector(payload) {
    const allowed_keys = ['items'];

    items_validator(payload);

    return sanitize_additionnals(allowed_keys, payload);
}

function text(payload) {
    const allowed_keys = ['multiline'];

    if (!Object.keys(payload.parameters).includes('multiline')) {
        throw new Error(`multiline should be present.`);
    } else if (typeof payload.parameters.multiline !== 'boolean') {
        throw new Error(`multiline is not a boolean.`);
    }

    return sanitize_additionnals(allowed_keys, payload);
}

module.exports = {
    checkbox,
    date,
    number,
    range,
    selector,
    text,
};
