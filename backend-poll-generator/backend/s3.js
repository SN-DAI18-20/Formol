const Minio = require('minio');

const log = require('./logger');
const config = require('../config/backend');

const s3Client = new Minio.Client({
    endPoint: config.aws_s3_endpoint,
    port: config.aws_s3_port || null,
    useSSL: config.aws_s3_useSSL,
    accessKey: config.aws_s3_access_key,
    secretKey: config.aws_s3_secret_key,
});

async function setup_s3() {
    const bucketName = config.aws_s3_bucket_name;
    const bucketRegion = config.aws_s3_region_name;

    log.info('Check s3 environment configuration...');

    try {
        if ((await s3Client.bucketExists(bucketName)) == false) {
            log.warn(`Bucket '${bucketName}' not exists, creating it...`);

            await s3Client.makeBucket(bucketName, bucketRegion);

            log.info(`Bucket '${bucketName}' created!`);
        } else {
            log.info(`Bucket '${bucketName}' already exists!`);
        }
    } catch (err) {
        log.error('An error was occured on setup s3. Traceback:', err);
        Promise.reject();
    }
}

module.exports = {
    s3Client,
    setup_s3,
};
