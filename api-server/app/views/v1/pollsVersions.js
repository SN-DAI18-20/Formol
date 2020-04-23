const { sequelize } = require('../../models');

const { Polls, PollsVersions, PollsQuestions } = require('../../models');
const generate_uid = require('../../helpers/uid-creation');
const QuestionsValidators = require('./validators/questionTypes');
const GenericSchema = require('./genericSchema');
const backend = require('../../backend');
const config = require('../../../config/server');

const PollVersionGenericSchema = {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    poll: { type: 'string', format: 'uuid' },
    questions: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                question: { type: 'string' },
                type: { type: 'string' },
                parameters: { type: 'object' },
                required: { type: 'boolean' },
            },
        },
    },
    view_href: { type: 'string' },
    download_href: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
};

const VersionCollectionGetSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get  of the active poll version',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            description: 'Return a list of versions',
            type: 'array',
            items: {
                type: 'object',
                properties: PollVersionGenericSchema,
            },
        },
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

const VersionCollectionPostSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Create a new version of the poll',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    body: {
        type: 'array',
        items: {
            type: 'object',
            required: ['question', 'type', 'parameters'],
            properties: {
                question: { type: 'string' },
                type: {
                    type: 'string',
                    enum: [
                        'checkbox',
                        'date',
                        'number',
                        'radio',
                        'range',
                        'selector',
                        'text',
                    ],
                },
                parameters: { type: 'object' },
                required: { type: 'boolean', default: false },
            },
        },
    },
    response: {
        201: GenericSchema.RessourceCreatedReturn,
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

const VersionGetSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get the form of the active poll version',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
            versionId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            description: 'Return informations about the requested version',
            properties: PollVersionGenericSchema,
        },
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

const VersionActivePutSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get the form of the active poll version',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
            versionId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        202: GenericSchema.AcceptedReturn,
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

const VersionDeleteSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get the form of the active poll version',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
            versionId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        202: GenericSchema.DeletedReturn,
        403: {
            description: 'Forbidden',
            type: 'object',
            properties: {
                statusCode: { type: 'integer' },
                error: { type: 'string' },
                message: { type: 'string' },
            },
        },
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

async function VersionCollectionGet(request, reply) {
    const pollId = request.params.pollId;

    const poll = await Polls.findByPk(pollId);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const versionCollectionQuery = await PollsVersions.findAll({
        where: {
            poll: request.params.pollId,
        },
    });

    const versions = [];
    const versionsMap = versionCollectionQuery.map(poll => poll.toJSON());

    versionsMap.forEach(element => {
        versions.push({
            id: element.id,
            name: element.name,
            poll: element.poll,
            // view_url: element.view_url,
            // download_url: element.download_url,
            view_url: `${config.polls_public_uri}/${element.poll}/${element.id}`,
            download_url: `${config.polls_public_uri}/${element.poll}/${element.id}`,
            active: element.active || false,
        });
    });

    reply.send(JSON.stringify(versions));
}
async function VersionCollectionPost(request, reply) {
    const pollId = request.params.pollId;
    const body = request.body;
    const validationErrors = [];

    // Validate parameters for each question
    request.body.forEach((el, it) => {
        try {
            const values = QuestionsValidators[el.type](el);
        } catch (error) {
            validationErrors.push([error.message, it]);
        }
    });

    if (validationErrors.length != 0) {
        let errorMessage = '';

        validationErrors.forEach((el, it) => {
            const msg = `body.form[${el[1]}].parameters.${el[0]}`;
            errorMessage += it != 0 ? ', ' + msg : msg;
        });

        return reply.badRequest(errorMessage).sent();
    }

    const poll = await Polls.findByPk(pollId);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    // Beginning of the creation process
    const transaction = await sequelize.transaction();
    let poll_id = request.params.pollId;
    let version_id;

    try {
        // Remove active status to other versions
        await PollsVersions.update(
            { active: null },
            {
                where: {
                    poll: poll_id,
                },
            },
            { transaction }
        );

        const version = await PollsVersions.create(
            {
                name: generate_uid(),
                poll: poll_id,
                active: true,
            },
            { transaction }
        );

        version_id = version.id;

        const questions = [];
        body.forEach(async el => {
            questions.push({
                poll_version: version.id,
                question: el.question,
                type: el.type,
                parameters: el.parameters,
                required: el.required || false,
            });
        });

        await PollsQuestions.bulkCreate(questions, { transaction });

        // Send a task to the backend
        backend.generate_poll.add({
            poll: {
                id: poll.id,
                name: poll.name,
                versionId: version.id,
            },
            questions: questions,
        });

        await transaction.commit();
    } catch (error) {
        request.log.error(error);
        request.log.trace('Unable to create the version');

        await transaction.rollback();

        return reply.internalServerError();
    }

    return reply.code(201).send(
        JSON.stringify({
            message: 'Ressource created',
            ressource_id: version_id,
        })
    );
}

async function VersionActiveGet(request, reply) {
    const poll_id = request.params.pollId;

    const poll = await Polls.findByPk(poll_id);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const version = await PollsVersions.findOne({
        where: { poll: poll_id, active: true },
    });

    if (version === null) {
        return reply
            .notFound(`Ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const questionsQuery = await PollsQuestions.findAll({
        where: {
            poll_version: version.id,
        },
    });

    const questions = [];
    const questionMap = questionsQuery.map(question => question.toJSON());

    questionMap.forEach(el => {
        questions.push({
            question: el.question,
            type: el.type,
            parameters: el.parameters,
            required: el.required,
        });
    });

    const result = {
        id: version.id,
        name: version.name,
        poll: poll_id,
        questions: questions,
        // view_href: version.view_url,
        // download_href: version.download_url,
        view_url: `${config.polls_public_uri}/${poll_id}/${version.id}`,
        download_url: `${config.polls_public_uri}/${poll_id}/${version.id}`,
    };

    return reply.send(JSON.stringify(result));
}

async function VersionGet(request, reply) {
    const poll_id = request.params.pollId;
    const version_id = request.params.versionId;

    const poll = await Polls.findByPk(poll_id);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const version = await PollsVersions.findByPk(version_id);

    if (version === null) {
        return reply
            .notFound(`Ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const questionsQuery = await PollsQuestions.findAll({
        where: {
            poll_version: version.id,
        },
    });

    const questions = [];
    const questionMap = questionsQuery.map(question => question.toJSON());

    questionMap.forEach(el => {
        questions.push({
            question: el.question,
            type: el.type,
            parameters: el.parameters,
            required: el.required,
        });
    });

    const result = {
        id: version.id,
        name: version.name,
        poll: poll_id,
        questions: questions,
        // view_href: version.view_url,
        // download_href: version.download_url,
        view_url: `${config.polls_public_uri}/${poll_id}/${version.id}`,
        download_url: `${config.polls_public_uri}/${poll_id}/${version.id}`,
    };

    reply.send(JSON.stringify(result));
}
async function VersionActivePut(request, reply) {
    const pollId = request.params.pollId;
    const versionId = request.params.versionId;

    const poll = await Polls.findByPk(pollId);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const version = await PollsVersions.findByPk(versionId, {
        where: { poll: pollId },
    });

    if (version == null) {
        return reply.notFound(`Ressource '${versionId}' not exists.`);
    }

    const transaction = await sequelize.transaction();

    try {
        // Remove active status to other versions
        await PollsVersions.update(
            { active: null },
            {
                where: {
                    poll: pollId,
                },
            },
            { transaction }
        );

        // // Set itself as active
        await PollsVersions.update(
            { active: true },
            {
                where: { id: versionId },
            },
            { transaction }
        );

        await transaction.commit();
    } catch (error) {
        request.log.error(error);
        request.log.trace(`Unable to update poll version '${versionId}'`);

        await transaction.rollback();
        return reply.internalServerError();
    }

    return reply
        .code(202)
        .send(JSON.stringify({ message: 'Request accepted' }));
}

async function VersionDelete(request, reply) {
    const versionId = request.params.versionId;
    const pollId = request.params.pollId;

    const poll = await Polls.findByPk(pollId);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const version = await PollsVersions.findByPk(versionId);

    if (version == null) {
        return reply.notFound(`Ressource '${versionId}' not exists.`);
    }

    if (version.active == true) {
        return reply.forbidden(`You can't delete an active version.`);
    }

    const transaction = await sequelize.transaction();

    try {
        await PollsVersions.destroy(
            {
                where: { id: versionId },
            },
            { transaction }
        );

        await transaction.commit();
    } catch (error) {
        request.log.trace(`Unable to delete version '${versionId}'`);

        await transaction.rollback();
        return reply.internalServerError();
    }

    return reply
        .code(202)
        .send(JSON.stringify({ message: 'Ressource deleted.' }));
}

module.exports = {
    polls: {
        ':pollId': {
            versions: {
                GET: {
                    handler: VersionCollectionGet,
                    schema: VersionCollectionGetSchema,
                },
                POST: {
                    handler: VersionCollectionPost,
                    schema: VersionCollectionPostSchema,
                },
                active: {
                    GET: {
                        handler: VersionActiveGet,
                        schema: VersionCollectionGetSchema,
                    },
                },
                ':versionId': {
                    GET: {
                        handler: VersionGet,
                        schema: VersionGetSchema,
                    },
                    activate: {
                        PUT: {
                            handler: VersionActivePut,
                            schema: VersionActivePutSchema,
                        },
                    },
                    DELETE: {
                        handler: VersionDelete,
                        schema: VersionDeleteSchema,
                    },
                },
            },
        },
    },
};
