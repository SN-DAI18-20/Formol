// This file will import all workers for initialize them and make the backend
// working.
const logger = require('./logger');

const BACKEND_VERSION = require('../package.json').version;

logger.info(
    `Formol Poll generation backend version ${BACKEND_VERSION} in ` +
        `${process.env.NODE_ENV || 'development'} environment.`
);

// Here the rest of the code...

// XXX: This seems to loop and it doesn't work.
// process.on('beforeExit', code => {
//     logger.info('Backend is shutting down...');
// });
