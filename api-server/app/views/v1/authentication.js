const bcrypt = require('bcrypt');
const sequelize = require('../../models');


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
        signup: {
            POST: {
                handler: postSignup,
                schema: postSignupSchema,
            },
        },
    },
};
