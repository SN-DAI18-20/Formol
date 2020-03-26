const config = require('../config/backend');
const Redis = require('ioredis');

// Create Redis connection
const redisConn = new Redis({
    host: config.backend_redis_host,
    port: config.backend_redis_port || 6379,
    password: config.backend_redis_pass || null,
    database: config.backend_redis_db || null,
});

module.exports = redisConn;
