const PollsFormGetSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

const PollsFormPostSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

async function PollsFormGet(request, reply) {}

async function PollsFormPost(request, reply) {}

module.exports = {
    polls: {
        ':pollId': {
            form: {
                GET: {
                    handler: PollsFormGet,
                    schema: PollsFormGetSchema,
                },
                POST: {
                    handler: PollsFormPost,
                    schema: PollsFormPostSchema,
                },
            },
        },
    },
};
