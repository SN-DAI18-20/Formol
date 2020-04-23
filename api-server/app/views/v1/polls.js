const { sequelize } = require('../../models');
const { Op } = require('sequelize');

const { Polls, PollsVersions, PollsQuestions } = require('../../models');
const generate_uid = require('../../helpers/uid-creation');
const QuestionsValidators = require('./validators/questionTypes');
const GenericSchema = require('./genericSchema');
const backend = require('../../backend');
const config = require('../../../config/server');

const PollGetGenericSchema = {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    description: { type: 'string' },
    draft: { type: 'boolean' },
    view_url: { type: 'string' },
    download_url: { type: 'string' },
    version: {
        type: 'object',
        properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
        },
    },
    published_at: { type: 'string', format: 'date-time' },
    depublished_at: { type: 'string', format: 'date-time' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
};

const PollsGetCollectionSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get a list of polls',
    response: {
        200: {
            description: 'Return a list of polls',
            type: 'array',
            items: {
                type: 'object',
                properties: PollGetGenericSchema,
            },
        },
        403: GenericSchema.ForbiddenReturn,
    },
};

const PollsGetSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get informations about the requested poll',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            description: 'Return informations about the requested poll',
            properties: PollGetGenericSchema,
        },
        404: GenericSchema.RessourceNotFoundReturn,
        403: GenericSchema.ForbiddenReturn,
    },
};

const PollsPostSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Create a new poll',
    body: {
        required: ['name', 'form'],
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            form: {
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
                minItems: 1,
            },
        },
    },
    response: {
        201: GenericSchema.RessourceCreatedReturn,
        403: GenericSchema.ForbiddenReturn,
    },
};

const PollsPatchSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Update informations for the requested poll',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    body: {
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            draft: { type: 'boolean' },
            published_at: { type: 'string', format: 'date-time' },
            depublished_at: { type: 'string', format: 'date-time' },
        },
    },
    response: {
        202: GenericSchema.AcceptedReturn,
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

const PollsDeleteSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Delete the requested poll',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        202: GenericSchema.DeletedReturn,
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

async function PollsCollectionGet(request, reply) {
    const pollsQuery = await Polls.findAll({
        where: {
            '$PollsVersions.active$': {
                [Op.eq]: true,
            },
        },
        include: [PollsVersions],
    });

    const pollsMap = pollsQuery.map(poll => poll.toJSON());
    const polls = [];

    pollsMap.forEach(el => {
        polls.push({
            id: el.id,
            name: el.name,
            description: el.description,
            version: {
                id: el.PollsVersions[0].id,
                name: el.PollsVersions[0].name,
            },
            draft: el.draft,
            view_url: el.PollsVersions[0].view_url,
            // download_url: el.PollsVersions[0].download_url,
            // published_at: el.published_at,
            view_url:
                `${config.polls_public_uri}/${el.id}/` +
                `${el.PollsVersions[0].id}`,
            download_url:
                `${config.polls_public_uri}/${el.id}/` +
                `${el.PollsVersions[0].id}`,
            depublished_at: el.depublished_at,
            created_at: el.createdAt,
            updated_at: el.updatedAt,
        });
    });

    reply.header('X-Total-Count', polls.length).send(JSON.stringify(polls));
}

async function PollsGet(request, reply) {
    const pollsQuery = await Polls.findOne({
        where: {
            id: request.params.pollId,
            '$PollsVersions.active$': {
                [Op.eq]: true,
            },
        },
        include: [PollsVersions],
    });

    if (pollsQuery === null) {
        return reply
            .notFound(`Ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const poll = {
        id: pollsQuery.id,
        name: pollsQuery.name,
        description: pollsQuery.description,
        version: {
            id: pollsQuery.PollsVersions[0].id,
            name: pollsQuery.PollsVersions[0].name,
        },
        draft: pollsQuery.draft,
        // view_url: pollsQuery.PollsVersions[0].view_url,
        // download_url: pollsQuery.PollsVersions[0].download_url,
        view_url:
            `${config.polls_public_uri}/${pollsQuery.id}/` +
            `${pollsQuery.PollsVersions[0].id}`,
        download_url:
            `${config.polls_public_uri}/${pollsQuery.id}/` +
            `${pollsQuery.PollsVersions[0].id}`,
        published_at: pollsQuery.published_at,
        depublished_at: pollsQuery.depublished_at,
        created_at: pollsQuery.createdAt,
        updated_at: pollsQuery.updatedAt,
    };

    reply.send(JSON.stringify(poll));
}

async function PollsPost(request, reply) {
    const body = request.body;
    const validationErrors = [];

    // Validate parameters for each question
    request.body.form.forEach((el, it) => {
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

    // Beginning of the creation process
    const transaction = await sequelize.transaction();
    let poll_id = '';

    try {
        const poll = await Polls.create(
            {
                name: body.name,
                description: body.description,
                draft: false,
            },
            { transaction }
        );

        poll_id = poll.id;

        const version = await PollsVersions.create(
            {
                name: generate_uid(),
                poll: poll.id,
                active: true,
            },
            { transaction }
        );

        const questions = [];
        body.form.forEach(async el => {
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
        request.log.trace('Unable to create the poll');

        await transaction.rollback();

        return reply.internalServerError();
    }

    return reply.code(201).send(
        JSON.stringify({
            message: 'Ressource created',
            ressource_id: poll_id,
        })
    );
}

async function PollsPatch(request, reply) {
    const poll = await Polls.findOne({
        where: { id: request.params.pollId },
    });

    if (poll === null) {
        return reply
            .notFound(`Ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    if (
        (request.body.draft === true || poll.draft === true) &&
        (Object.keys(request.body).includes('published_at') ||
            Object.keys(request.body).includes('depublished_at'))
    ) {
        reply.badRequest(
            "You cannot specify a 'published_at' or a 'depublished_at' if " +
                'the poll is still a draft.'
        );
    }

    const validatedParams = Object.assign({}, request.body);

    if (validatedParams.draft === true) {
        validatedParams['published_at'] = null;
        validatedParams['depublished_at'] = null;
    }

    await Polls.update(validatedParams, {
        where: { id: request.params.pollId },
    });

    reply.code(202).send(JSON.stringify({ message: 'Request accepted' }));
}

async function PollsDelete(request, reply) {
    const pollsQuery = await Polls.findOne({
        where: { id: request.params.pollId },
    });

    if (pollsQuery === null) {
        return reply
            .notFound(`Ressource '${request.params.pollId}' not exists.`)
            .sent();
    }

    const transaction = await sequelize.transaction();

    try {
        await PollsVersions.destroy(
            {
                where: { poll: request.params.pollId },
            },
            { transaction }
        );

        await Polls.destroy(
            {
                where: { id: request.params.pollId },
            },
            { transaction }
        );

        await transaction.commit();
    } catch (error) {
        request.log.trace(`Unable to delete poll '${request.params.pollId}'`);

        await transaction.rollback();

        return reply.internalServerError();
    }

    return reply.code(202).send(
        JSON.stringify({
            message: 'Ressource deleted.',
        })
    );
}

module.exports = {
    polls: {
        GET: {
            handler: PollsCollectionGet,
            schema: PollsGetCollectionSchema,
        },
        POST: {
            handler: PollsPost,
            schema: PollsPostSchema,
        },
        ':pollId': {
            GET: {
                handler: PollsGet,
                schema: PollsGetSchema,
            },
            PATCH: {
                handler: PollsPatch,
                schema: PollsPatchSchema,
            },
            DELETE: {
                handler: PollsDelete,
                schema: PollsDeleteSchema,
            },
        },
    },
};
