const fastify = require('fastify')({ logger: true });
const Minio = require('minio');

const log = fastify.log;
const config = require('../config/config');

// Specify const variables for the Webserver
const HTTP_BIND = process.env.HTTP_BIND || config.bind_ip || '0.0.0.0';
const HTTP_PORT = process.env.HTTP_PORT || config.bind_port || 3001;

// Configure s3 client
const s3Client = new Minio.Client({
    endPoint: config.aws_s3_endpoint,
    port: config.aws_s3_port || null,
    useSSL: config.aws_s3_useSSL,
    accessKey: config.aws_s3_access_key,
    secretKey: config.aws_s3_secret_key,
});

(async function () {
    log.info('s3-gateway is starting...');

    // Check if the bucket exists or not
    const bucketName = config.aws_s3_bucket_name;

    log.info(`Check if '${bucketName}' bucket exists...`);

    try {
        if ((await s3Client.bucketExists(bucketName)) == true) {
            log.info(`'${bucketName}' bucket found!`);
        } else {
            log.error(
                `The bucket '${bucketName}' not exists. Unable to continue.`
            );
            process.exit(200);
        }
    } catch (err) {
        log.error(
            'An error was occured on connecting to the s3 server. Traceback:',
            err
        );
        process.exit(100);
    }

    // Declare default route for monitoring purposes
    fastify.get('/', (_, reply) => reply.send({ message: 'plop!' }));

    // Declare OPTIONS route for CORS issues
    fastify.options('*', (_, reply) => reply.send());

    // Route that returns the file from the bucket
    fastify.get('/:pollId/:versionId', async (request, reply) => {
        const pollId = request.params.pollId;
        const versionId = request.params.versionId;
        const filePath = `${pollId}/${versionId}.html`;

        try {
            let chunks = [];
            const file = await s3Client.getObject(bucketName, filePath);

            file.on('data', (chunk) => chunks.push(chunk));

            file.on('end', () => {
                return reply
                    .header(
                        'content-type',
                        'text/html; charset=utf-8'
                    )
                    .header('Cache-Control', 'max-age=3600')
                    .send(Buffer.concat(chunks).toString()).sent;
            });
        } catch (err) {
            console.error(err);
            log.warn('Unable to retrieve the file from s3. Traceback: ', err);
            return reply.code(404).send({ message: 'File not found.' });
        }
    });

    // Open fastify socket
    fastify.listen(HTTP_PORT, HTTP_BIND, (err, _) => {
        if (err) throw err;
    });
})();
