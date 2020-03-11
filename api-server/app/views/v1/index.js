const pjson = require('../../../package.json');
const authenticationRoutes = require('./authentication');
const pollsRoutes = require('./polls');
const pollsEventsRoutes = require('./pollsEvents');
const pollsFormsRoutes = require('./pollsForms');
const pollsRecipientsRoutes = require('./pollsRecipients');

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
    fastify.register(
        require('../../helpers/route-declaration'),
        authenticationRoutes
    );
    fastify.register(require('../../helpers/route-declaration'), pollsRoutes);
    fastify.register(
        require('../../helpers/route-declaration'),
        pollsFormsRoutes
    );
    fastify.register(
        require('../../helpers/route-declaration'),
        pollsEventsRoutes
    );
    fastify.register(
        require('../../helpers/route-declaration'),
        pollsRecipientsRoutes
    );

    done();
};
