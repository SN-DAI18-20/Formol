const logger = require('./logger');
const config = require('../config/backend');

const BACKEND_VERSION = require('../package.json').version;
const CONFIGURED_QUEUES = config.backend_queues || [];

(async function() {
    logger.info(
        `Formol Poll generation backend version ${BACKEND_VERSION} in ` +
            `${process.env.NODE_ENV || 'development'} environment.`
    );

    // Import all queues set in the configuration file
    for (queue in CONFIGURED_QUEUES) {
        logger.info(`Configuring '${CONFIGURED_QUEUES[queue]}' queue ...`);

        try {
            await require(`./queues/${CONFIGURED_QUEUES[queue]}`);
        } catch (err) {
            logger.error(
                `Unable to configure '${CONFIGURED_QUEUES[queue]}' queue ` +
                `because it not exists.`
            );
        }
    }
})();
