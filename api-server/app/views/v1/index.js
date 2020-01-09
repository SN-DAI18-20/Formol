const pjson = require('../../../package.json');
const authentication_controller = require('./authentication');

module.exports = async function(fastify, opts, done) {
    // Define Swagger route
    await fastify.register(require('fastify-swagger'), {
        routePrefix: '/schema',
        exposeRoute: true,
        swagger: {
            info: {
                title: 'Formol APIv1 Swagger schema',
                version: pjson.version,
            },
            host: 'localhost',
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    });

    // Define v1 routes
    const controllers = {
        ...authentication_controller,
    };

    fastify.register(require('../../helpers/route-declaration'), controllers);

    done();
};
