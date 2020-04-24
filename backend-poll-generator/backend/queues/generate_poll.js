const { readFileSync } = require('fs');

const Bull = require('bull');
const ejs = require('ejs');

const logger = require('../logger');
const redisConn = require('../helper/redisConf');
const { uploadVersion } = require('../helper/s3Polls');

const queue = new Bull('generate_poll', { redis: redisConn });

queue.process(async (job, done) => {
    logger.info(
        `Job ${job.id} with payload ${JSON.stringify(job.data)} received ` +
            `on queue generate_poll`
    );

    const template = readFileSync('../templates/polls.ejs');
    const renderedTemplate = ejs.render(template.toString(), job.data);

    console.log(renderedTemplate);

    try {
        await uploadVersion(
            job.data.poll.id,
            job.data.poll.versionId,
            renderedTemplate
        );
    } catch (err) {
        done(new Error('Unable to upload to s3.'));
    }

    done();
});

module.exports = queue;
