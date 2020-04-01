const GenericSchema = require('./genericSchema');

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
    body: {
        type: 'array',
        items: {
            type: 'object',
            properties: PollVersionGenericSchema,
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
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

async function VersionCollectionGet(request, reply) {}
async function VersionCollectionPost(request, reply) {}

async function VersionActiveGet(request, reply) {}

async function VersionGet(request, reply) {}
async function VersionActivePut(request, reply) {
    // This route doesn't have parameters in body. When the route is called,
    // we disable the current version and set the given version as active.
}
async function VersionDelete(request, reply) {}

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
