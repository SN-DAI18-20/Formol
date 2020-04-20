const Bull = require('bull');

const config = require('../config/server');

// Create Redis connection
const redisConn = {
    host: config.backend_redis_host || 'localhost',
    port: config.backend_redis_port || 6379,
    password: config.backend_redis_pass || null,
    database: config.backend_redis_db || 0,
};

module.exports = {
    generate_poll: new Bull('generate_poll', { redis: redisConn }),
};
