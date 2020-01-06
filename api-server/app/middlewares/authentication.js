const jwt = require("jsonwebtoken");

/**
 * Middleware that verify if the received JWT token is valid or not.
 *
 * The middleware call the `next` callback if the token is valid.
 * In case the token is invalid, it return a 401 and a error message.
 * In case the token expired or invalidated, it returns a 401 with an error message.
 *
 * @param {*} req
 * @param {*} reply
 * @param {*} next
 */
const jwt_verify = (req, reply, next) => {

};

module.exports = {
    jwt_verify
};
