const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../../models');
const uuid = require('uuid/v4');

const config = require('../../../config/server');

const postSigninSchema = {
    tags: [{ name: 'Authentication' }],
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            rememberMe: { type: ['boolean', 'null'] },
        },
    },
    response: {
        201: {
            description: 'Token created',
            type: 'object',
            properties: {
                message: { type: 'string' },
                token: { type: 'string' },
            },
        },
        401: {
            description: 'User/Email or Password incorrect',
            type: 'object',
            properties: {
                statusCode: { type: 'integer' },
                error: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

async function postSignin(request, reply) {
    const unauthorizedMsg =
        'Username/Email or the password is not valid. ' +
        'Please double check before retrying';

    let user = await sequelize.Users.findOne({
        where: {
            username: request.body.username,
        },
    });

    // Check if one user was found
    if (user == null) {
        // Fallback on the email address
        user = await sequelize.Users.findOne({
            where: {
                email: request.body.username,
            },
        });

        if (user != null) reply.unauthorized(unauthorizedMsg).sent();
    }

    // Check if the password hash matches
    if (!bcrypt.compareSync(request.body.password, user.dataValues.password))
        reply.unauthorized(unauthorizedMsg).sent();

    // Generate the JWT token
    const token = jwt.sign(
        {
            jti: uuid(),
            exp: request.body.rememberMe == true ? 7 * 3600 : 2 * 3600,
        },
        config.jwt_secret
    );

    reply.code(201).send({ token, message: 'Token created' });
}

const postSignupSchema = {
    tags: [{ name: 'Authentication' }],
    body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: {
                type: 'string',
                minLength: 8,
            },
        },
    },
    response: {
        201: {
            description: 'User created',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        409: {
            description: 'User Ressource in conflict',
            type: 'object',
            properties: {
                statusCode: { type: 'integer' },
                error: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

async function postSignup(request, reply) {
    // Check if the username is already used or not
    const userInDb = await sequelize.Users.findOne({
        where: {
            username: request.body.username,
            deleted_at: null,
        },
    });

    if (userInDb != null) reply.conflict('Username already taken.').sent();

    // Check if the email is already used or not
    const emailInDb = await sequelize.Users.findOne({
        where: {
            email: request.body.email,
            deleted_at: null,
        },
    });

    if (emailInDb != null)
        reply.conflict('Email address already taken.').sent();

    // Create the user
    try {
        await sequelize.Users.create({
            username: request.body.username,
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, 8),
        });
    } catch (err) {
        reply.log.error(err);
        reply.internalServerError().sent();
    }

    reply.code(201).send({ message: 'User created.' });
}

module.exports = {
    authentication: {
        signin: {
            POST: {
                handler: postSignin,
                schema: postSigninSchema,
            },
        },
        signup: {
            POST: {
                handler: postSignup,
                schema: postSignupSchema,
            },
        },
    },
};
