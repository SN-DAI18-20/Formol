const { s3Client } = require('../s3');
const log = require('../logger');
const config = require('../../config/backend');

async function uploadVersion(pollId, versionId, file) {
    const filePath = `${pollId}/${versionId}.html`;
    const bucketName = config.aws_s3_bucket_name;

    if (!Buffer.isBuffer(file)) {
        file = Buffer.from(file, 'utf-8');
    }

    try {
        await s3Client.putObject(bucketName, filePath, file);
        log.info(`'${filePath} uploaded in '${bucketName}' bucket.`);
    } catch (err) {
        log.error(
            `Unable to push file '${filePath}' in the bucket ` +
                `'${bucketName}'. Traceback: `,
            err
        );

        Promise.reject();
    }
}

async function deleteVersion(pollId, versionId) {
    const filePath = `${pollId}/${versionId}.html`;
    const bucketName = config.aws_s3_bucket_name;

    try {
        await s3Client.removeObject(bucketName, filePath);
        log.info(`'${filePath} removed from '${bucketName}' bucket.`);
    } catch (err) {
        log.error(
            `Unable to delete file '${filePath}' in the bucket ` +
                `'${bucketName}'. Traceback: `,
            err
        );

        Promise.reject();
    }
}

async function deletePoll(pollId) {
    throw new Error('Not implemented.');
}

module.exports = {
    deletePoll,
    deleteVersion,
    uploadVersion,
};
