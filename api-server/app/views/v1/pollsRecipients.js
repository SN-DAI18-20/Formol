const GenericSchema = require('./genericSchema');

const RecipientGenericSchema = {
    email: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
};

const PollsRecipientsGetCollectionSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get of recipients of the given poll',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            description: 'Returns all recipients of the given poll',
            type: 'array',
            items: {
                type: 'object',
                properties: RecipientGenericSchema,
            },
        },
        403: GenericSchema.ForbiddenReturn,
    },
};

const PollsRecipientsGetSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Get informations of the given recipient for the given poll',
    params: {
        type: 'object',
        required: ['pollId', 'recipientId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
            recipientId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: RecipientGenericSchema,
        },
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

const PollsRecipientsReinviteCollectionPutSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Send an e-mail to all recipients of the given poll',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        202: GenericSchema.AcceptedReturn,
        403: GenericSchema.ForbiddenReturn,
    },
};

const PollsRecipientsPostSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Insert new recipient to the given poll',
    params: {
        type: 'object',
        required: ['pollId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
        },
    },
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
        },
    },
    response: {
        201: GenericSchema.RessourceCreatedReturn,
        403: GenericSchema.ForbiddenReturn,
    },
};

const PollsRecipientsPutReinviteSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Send an e-mail to the given recipient for the given poll',
    params: {
        type: 'object',
        required: ['pollId', 'recipientId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
            recipientId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        202: GenericSchema.AcceptedReturn,
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

const PollsRecipientsDeleteSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Remove the given recipient for the given poll',
    params: {
        type: 'object',
        required: ['pollId', 'recipientId'],
        properties: {
            pollId: { type: 'string', format: 'uuid' },
            recipientId: { type: 'string', format: 'uuid' },
        },
    },
    response: {
        202: GenericSchema.AcceptedReturn,
        403: GenericSchema.ForbiddenReturn,
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

async function PollsRecipientsCollectionGet(request, reply) {}
async function PollsRecipientsCollectionPost(request, reply) {}
async function PollsRecipientsReinviteCollectionPut(request, reply) {}

async function PollsRecipientsGet(request, reply) {}
async function PollsRecipientsReinvitePut(request, reply) {}
async function PollsRecipientsDelete(request, reply) {}

module.exports = {
    polls: {
        ':pollId': {
            recipients: {
                GET: {
                    handler: PollsRecipientsCollectionGet,
                    schema: PollsRecipientsGetCollectionSchema,
                },
                POST: {
                    handler: PollsRecipientsCollectionPost,
                    schema: PollsRecipientsPostSchema,
                },
                reinvite: {
                    PUT: {
                        handler: PollsRecipientsReinviteCollectionPut,
                        schema: PollsRecipientsReinviteCollectionPutSchema,
                    },
                },
                ':recepientId': {
                    reinvite: {
                        PUT: {
                            handler: PollsRecipientsReinvitePut,
                            schema: PollsRecipientsPutReinviteSchema,
                        },
                    },
                    GET: {
                        handler: PollsRecipientsGet,
                        schema: PollsRecipientsGetSchema,
                    },
                    DELETE: {
                        handler: PollsRecipientsDelete,
                        schema: PollsRecipientsDeleteSchema,
                    },
                },
            },
        },
    },
};
