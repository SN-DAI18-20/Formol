/**
 * This helper expose a configuration object for configuring queues.
 */
const config = require('../../config/backend');

module.exports = {
    host: config.backend_redis_host || 'localhost',
    port: config.backend_redis_port || 6379,
    password: config.backend_redis_pass || null,
    database: config.backend_redis_db || 0,
};
