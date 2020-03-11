const PollsRecipientsGetCollectionSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

const PollsRecipientsGetSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

const PollsRecipientsPostSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

const PollsRecipientsPostReinviteSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

const PollsRecipientsPutSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

const PollsRecipientsDeleteSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};


async function PollsRecipientsCollectionGet(request, reply) {}
async function PollsRecipientsGet(request, reply) {}
async function PollsRecipientsPost(request, reply) {}
async function PollsRecipientsReinvitePost(request, reply) {}
async function PollsRecipientsPut(request, reply) {}
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
                    handler: PollsRecipientsPost,
                    schema: PollsRecipientsPostSchema,
                },
                PUT: {
                    handler: PollsRecipientsPut,
                    schema: PollsRecipientsPutSchema,
                },
                ':recepientId': {
                    reinvite: {
                        POST: {
                            handler: PollsRecipientsReinvitePost,
                            schema: PollsRecipientsPostReinviteSchema,
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
