const Bull = require('bull');

const logger = require('../logger');
const redisConn = require('../helper/redisConf');

const queue = new Bull('generate_poll', { redis: redisConn });

queue.process((job, done) => {
    logger.info(
        `Job ${job.id} with payload ${JSON.stringify(job.data)} received on queue generate_poll`
    );

    done();
});

module.exports = queue;
