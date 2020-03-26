const GenericSchema = require('./genericSchema');

const PollVersionGenericSchema = {};

const VersionGetSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get the form of the active poll version',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        // 200:
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

async function VersionGet(request, reply) {}

async function VersionPost(request, reply) {}

module.exports = {
    polls: {
        ':pollId': {
            version: {
                GET: {
                    handler: VersionGet,
                    schema: VersionGetSchema,
                },
                POST: {
                    handler: VersionPost,
                    schema: VersionPostSchema,
                },
                ':versionId': {
                    GET: {
                        handler: VersionGet,
                        schema: VersionGetSchema,
                    },
                    PATCH: {
                        handler: VersionGet,
                        schema: VersionGetSchema,
                    },
                    DELETE: {
                        handler: VersionGet,
                        schema: VersionGetSchema,
                    },
                },
            },
        },
    },
};
