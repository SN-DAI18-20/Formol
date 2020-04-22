const GenericSchema = require('./genericSchema');
const { sequelize } = require('../../models');
const{PollRecipients, Polls} = require('../../models');
const generate_uid = require('../../helpers/uid-creation');

const RecipientGenericSchema = {
    email: { type: 'string' },
    //created_at: { type: 'string', format: 'date-time' },
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

const PollsRecipientsDeleteCollectionSchema = {
    tags: [{ name: 'Polls' }],
    summary: 'Remove the recipients for the given poll',
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
        404: GenericSchema.RessourceNotFoundReturn,
    },
};

async function PollsRecipientsCollectionGet(request, reply) {
    const recipientQuerry = await PollRecipients.findAll(
        {
            where:{poll:request.params.pollId}
        }
    );
    if (recipientQuerry === null){
        return reply
        .notFound(`Ressource not exists.`)
        .sent();
    }
    const map = recipientQuerry.map(PollsRecipients => PollsRecipients.toJSON());
    const recipients = [];
    map.forEach(el => {
        recipients.push({
            email : el.recipient,
        });
    });
    return reply.send(JSON.stringify(recipients));
}
async function PollsRecipientsCollectionPost(request, reply) {
    const pollId = request.params.pollId;
    const pollQuerry = Polls.findByPk(pollId);
    
    if (pollQuerry === null){
        return reply.notFound(`Ressource '${pollId}' not exists.`)
        .sent();
    }
    try{
        const recipients = [];
        body.form.forEach(el => {
            recipients.push({
                recipient: el.email
            });
        });
        const transaction = await sequalize.transaction();
        await PollRecipients.bulkCreate(recipients, {transaction});
        await transaction.commit();
        return reply.code(201).send(
            JSON.stringify({
                message: 'Ressource created',
                ressource_id: pollId,
            })
        );
    }catch(error){
        request.log.error(error);
        request.log.trace('Unable to create the recipients');

        await transaction.rollback();

        return reply.internalServerError();

    }
    

}
async function PollsRecipientsReinviteCollectionPut(request, reply) {
    const pollId = request.params.pollId;
    const poll = await Polls.findByPk(pollId);
    if (poll === null){
        return reply.notFound(`Ressource '${pollId}' not exists.`)
        .sent();
    } 
    const recipientQuerry = await PollRecipients.findAll(
        {
            where:{poll:pollId}
        }
    );
    if (recipientQuerry === null){
        return reply.notFound(`Ressource '${pollId}' not exists.`)
        .sent();
    }
    const map = recipientQuerry.map(PollsRecipients => PollsRecipients.toJSON());
    const recipients = [];
    map.forEach(el => {
        recipients.push({
            id : el.id,
            email : el.recipient,
        });
    });
    //envoyer la liste au code de julie
}

async function PollsRecipientsGet(request, reply) {
    const recipientId = request.params.recipientId;
    const pollId = request.params.pollId;
    const poll = await Polls.findByPk(pollId);
    if (poll === null){
        return reply.notFound(`Ressource '${pollId}' not exists.`)
        .sent();
    } 
    const recipientQuerry = await PollRecipients.findByPk(recipientId);
    if (recipientQuerry === null){
        return reply.code(404).send("Ressource not found !");
    }
    return reply.code(200).send(
        JSON.stringify({
            email: recipientQuerry.recipient,
        })
    );
}
async function PollsRecipientsReinvitePut(request, reply) {
    const recipientId = request.params.recipientId;
    const pollId = request.params.pollId;
    const poll = await Polls.findByPk(pollId);
    if (poll === null){
        return reply.notFound(`Ressource '${pollId}' not exists.`)
        .sent();
    } 
    const recipientQuerry = await PollsRecipients.findByPk(recipienId);
    if (recipientQuerry === null){
        return reply.notFound(`Ressource '${recipientId}' not exists.`)
        .sent();
    }
    const recipient = {
        email: recipientQuerry.recipient,
    };
    //envoyer la liste au code de julie
    return reply.code(202).send(JSON.stringify({message : "Request accepted"}));
}
async function PollsRecipientsDelete(request, reply) {
    const recipientId = request.params.recipientId;
    const pollId = request.params.pollId;

    const poll = await Polls.findByPk(pollId);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${pollId}' not exists.`)
            .sent();
    }

    const recipient = await PollsRecipients.findByPk(recipientId);

    if (recipient === null) {
        return reply.notFound(`Ressource '${recipientId}' not exists.`);
    }

    const transaction = await sequelize.transaction();

    try {
        await PollsRecipients.destroy(
            {
                where: { id: recipientId },
            },
            { transaction }
        );

        await transaction.commit();
    } catch (error) {
        request.log.trace(`Unable to delete rcipient '${recipientId}'`);

        await transaction.rollback();
        return reply.internalServerError();
    }

    return reply
        .code(202)
        .send(JSON.stringify({ message: 'Ressource deleted.' }));
}

async function PollsRecipientsCollectionDelete(request, reply) {
    const pollId = request.params.pollId;

    const poll = await Polls.findByPk(pollId);

    if (poll === null) {
        return reply
            .notFound(`Poll ressource '${pollId}' not exists.`)
            .sent();
    }

    const transaction = await sequelize.transaction();

    try {
        await PollsRecipients.destroy(
            {
                where: { poll: pollId },
            },
            { transaction }
        );

        await transaction.commit();
    } catch (error) {
        request.log.trace(`Unable to delete recipients`);

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
