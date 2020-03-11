const PollsEventsGetCollectionSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

const PollsEventsGetSchema = {
    tags: [{ name: 'Polls' }],
    body: {},
    response: {}
};

async function PollsEventsCollectionGet(request, reply) {

}

async function PollsEventsGet(request, reply) {

}

module.exports = {
    polls: {
        ':pollId': {
            events: {
                GET: {
                    handler: PollsEventsCollectionGet,
                    schema: PollsEventsGetCollectionSchema,
                },
                ':eventId': {
                    GET: {
                        handler: PollsEventsGet,
                        schema: PollsEventsGetSchema,
                    }
                }
            }
        }
    }
};