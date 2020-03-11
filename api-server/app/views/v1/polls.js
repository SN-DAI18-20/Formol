const GenericSchema = require('./genericSchema');

const PollGetGenericSchema = {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    description: { type: 'string' },
    location: { type: 'string' },
    is_published: { type: 'boolean' },
    version: { type: 'string' },
    published_at: { type: 'string' },
    depublished_at: { type: 'string' },
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
                    type: 'object', // TODO: Fill this part.
                },
                minItems: 1
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
            is_published: { type: 'boolean' },
            version: { type: 'string' },
            published_at: { type: 'string' },
            depublished_at: { type: 'string' },
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
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

async function PollsCollectionGet(request, reply) {}
async function PollsGet(request, reply) {}
async function PollsPost(request, reply) {}
async function PollsPatch(request, reply) {}
async function PollsDelete(request, reply) {}

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
