const AcceptedReturn = {
    description: 'Request accepted',
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};

const DeletedReturn = {
    description: 'Ressource deleted.',
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};

const RessourceNotFoundReturn = {
    description: 'Ressource not found.',
    type: 'object',
    properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
    },
};

const ForbiddenReturn = {
    description: 'Not connected.',
    type: 'object',
    properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
    },
};

const RessourceCreatedReturn = {
    description: 'Ressource created',
    type: 'object',
    properties: {
        message: { type: 'string' },
        ressourceId: { type: 'string', format: 'uuid' },
    },
};

module.exports = {
    AcceptedReturn,
    DeletedReturn,
    ForbiddenReturn,
    RessourceNotFoundReturn,
    RessourceCreatedReturn,
};
