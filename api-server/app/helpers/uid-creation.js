const uuid = require('uuid').v4;

function generate_uid() {
    const uuid_ = uuid();

    return uuid_.slice(0, 6);
}

module.exports = generate_uid;
