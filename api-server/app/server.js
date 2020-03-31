const fastify = require('fastify')({
    logger: true,
    ajv: {
        customOptions: {
            removeAdditional: 'all',
            useDefaults: 'empty',
            coerceTypes: true,
            allErrors: true,
            nullable: true,
            strictDefaults: true,
            strictKeywords: true,
        },
    },
});
const app_config = require('../config/server');

// Specify const variables for the Webserver
const HTTP_BIND = process.env.HTTP_BIND | app_config.bind_ip | '[::]';
const HTTP_PORT = process.env.HTTP_PORT | app_config.bind_port | 3001;

// Register middlewares and utils
fastify.register(require('fastify-sensible'));

// Register routes
fastify.register(require('./views/v1'), { prefix: '/v1' });

// Start the Web server
if (process.env.NODE_ENV != 'test') {
    fastify.listen(HTTP_PORT, HTTP_BIND, (err, addr) => {
        if (err) throw err;

        fastify.log.info(`Formol's API server is listening on ${addr}`);
    });
}

module.exports = fastify;
