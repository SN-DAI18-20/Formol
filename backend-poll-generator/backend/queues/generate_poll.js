const { readFileSync } = require('fs');
const path = require('path');

const Bull = require('bull');
const ejs = require('ejs');

const logger = require('../logger');
const redisConn = require('../helper/redisConf');
const { uploadVersion } = require('../helper/s3Polls');

const queue = new Bull('generate_poll', { redis: redisConn });

const template = readFileSync(path.resolve(__dirname + '/../templates/polls.ejs')).toString();

queue.process(async (job, done) => {
    logger.info(
        `Job ${job.id} with payload ${JSON.stringify(job.data)} received ` +
            `on queue generate_poll`
    );

    var renderedTemplate;

    try {
        renderedTemplate = await ejs.render(template, job.data, {
            // debug: true,
            // compileDebug: true,
            async: true
        });
    } catch(err) {
        logger.error(err);
        return done(new Error('Unable to generate template'));
    }

    try {
        await uploadVersion(
            job.data.poll.id,
            job.data.poll.versionId,
            renderedTemplate
        );
    } catch (err) {
        logger.error(`Unable to upload ${job.id} template into s3.`);
        return done(new Error('Unable to upload to s3.'));
    }

    logger.info(`Template job ${job.id} is uploaded to s3!`);
    return done();
});

module.exports = queue;
