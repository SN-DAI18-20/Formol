const { sequelize } = require('../../models');
const { Op } = require('sequelize');

const { Polls, PollsVersions, PollsQuestions } = require('../../models');
const generate_uid = require('../../helpers/uid-creation');
const QuestionsValidators = require('./validators/questionTypes');
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

async function VersionCollectionGet(request, reply) {
    const versionCollectionQuerry = await PollsVersions.findAll({
        where : {
            poll: request.params.pollId,
        },
    });
    if (versionCollectionQuerry === null) {
        return reply
        .notFound(`Ressource '${request.params.pollId}' not exists.`)
        .sent();
    }
    const versions = [];
    const versionsMap =versionCollectionQuerry.map(Polls_versions => Polls_versions.toJson());
    console.log(Polls_versions);

    versionsMap.forEach(element =>{
        versions.push({
            id : element.id,
            name: element.name,
            poll: element.poll, 
            view_url: element.view_url,
            download_url: element.download_url,
            active: element.active,
        })
    });
    reply.send(JSON.stringify(versions));
}
async function VersionCollectionPost(request, reply) {
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
    let poll_id = request.params.pollId;

    try {
        const version = await PollsVersions.create(
            {
                name: generate_uid(),
                poll: poll_id,
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
            ressource_id: poll_id,
        })
    );
}

async function VersionActiveGet(request, reply) {
    const poll_id = request.params.pollId;
    const questions = [];
    const version = await PollsVersions.findOne({
        where :{ [OP.and]: 
        [{poll: poll_id}, 
        {active: true}]
        }
        
    });
    if (version === null) {
        return reply
        .notFound(`Ressource '${request.params.pollId}' not exists.`)
        .sent();
    }

    const questionsQuerry = await PollsQuestions.findAll({
        where : {
            poll_version : version.id,
        }
    });
    const questionMap = questionsQuerry.map(PollsQuestions => PollsQuestions.toJson());
    questionMap.forEach(element => {
        // const param = [];
        // element.parameters.forEach(par =>{
        //     param.push(par);
        // });
        questions.push({
            question: element.question,
            type: element.type,
            parameters: element.parameters, 
            required: element.required,
        });
    });
    const result = {
        id: version.id, 
        name: version.name,
        poll: poll_id,
        questions: questions,
        view_href: version.view_url,
        download_href: version.download_url,
    };
    return reply.send(JSON.stringify(result));
}

async function VersionGet(request, reply) {
    const poll_id = request.params.pollId;
    const version_id = request.params.versionId;
    const questions = [];
    const version = await PollsVersions.findOne({
        where :{ [OP.and]: 
        [{poll: poll_id}, 
        {id : version_id}]
        }
        
    });
    if (version === null) {
        return reply
        .notFound(`Ressource '${request.params.pollId}' not exists.`)
        .sent();
    }

    const questionsQuerry = await PollsQuestions.findAll({
        where : {
            poll_version : version.id,
        }
    });
    const questionMap = questionsQuerry.map(PollsQuestions => PollsQuestions.toJson());
    questionMap.forEach(element => {
        // const param = [];
        // element.parameters.forEach(par =>{
        //     param.push(par);
        // });
        questions.push({
            question: element.question,
            type: element.type,
            parameters: element.parameters, 
            required: element.required,
        });
    });
    const result = {
        id: version.id, 
        name: version.name,
        poll: poll_id,
        questions: questions,
        view_href: version.view_url,
        download_href: version.download_url,
    };
    reply.send(JSON.stringify(result));
}
async function VersionActivePut(request, reply) {
    // This route doesn't have parameters in body. When the route is called,
    // we disable the current version and set the given version as active.
    const pollId = request.params.pollId;
    const versionId = request.params.versionId;
    try{
        const versionget = await PollsVersions.findOne({
            where: { [OP.and]: 
                [{poll: pollId}, 
                {id : versionId}]
            }
        });
        if (versionget == null){
            return reply.notFound(`Ressource '${versionId}' not exists.`)
        }
        await PollsVersions.update({
            active: true,},
            {where:{ [OP.and]: 
                [{poll: pollId}, 
                {activate : true}]
            },
        })
        .success(function(){
            await PollsVersions.update({
                active: true,},
                {where:{ [OP.and]: 
                    [{poll: pollId}, 
                    {id : versionId}]
                    }
            })
            .success(function(){
                reply.code(200).send(JSON.stringify({ message: 'Request accepted' }));
            });
        });
    }catch(error){
        request.log.trace(error);
        request.log.trace(`Unable to update poll '${versionId}'`);
        return reply.internalServerError();
    }  

}
async function VersionDelete(request, reply) {
    const pollId = request.params.pollId;
    const versionId = request.params.versionId;
    const transaction = sequelize.transaction();
    //Doit delete questions ? 
    const versionget = await PollsVersions.findOne({
        where: { [OP.and]: 
            [{poll: pollId}, 
            {id : versionId}]
        }
    });
    if (versionget == null){
        return reply.notFound(`Ressource '${versionId}' not exists.`)
    }
    try{
        await PollsVersions.destroy(
            {
                where: { [OP.and]: 
                    [{poll: pollId}, 
                    {id : versionId}]
                }
            },
            {transaction}
        );
//        await PollsQuestions.destroy(
//            {
//                where: {poll_version : versionId}
//            },
//            {transaction}
//        );
        await transaction.commit();
    }catch(error){
        request.log.trace(`Unable to delete version '${versionId}'`);

        await transaction.rollback();

        return reply.internalServerError();
    }

    return reply.code(200).send(JSON.stringify({ message: 'Request accepted' }));

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
