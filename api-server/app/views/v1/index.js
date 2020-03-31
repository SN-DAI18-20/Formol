const pjson = require('../../../package.json');
const authenticationRoutes = require('./authentication');
const pollsRoutes = require('./polls');
const PollsVersionsRoutes = require('./pollsVersions');
const pollsRecipientsRoutes = require('./pollsRecipients');
const config = require('../../../config/server');

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
            host: config.exposed_uri,
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
    // fastify.register(
    //     require('../../helpers/route-declaration'),
    //     pollsEventsRoutes
    // ); // Not enough time for making this part.
    fastify.register(
        require('../../helpers/route-declaration'),
        PollsVersionsRoutes
    );
    fastify.register(
        require('../../helpers/route-declaration'),
        pollsRecipientsRoutes
    );

    done();
};
