// This file will import all workers for initialize them and make the backend
// working.
const BACKEND_VERSION = require('../package.json').version;

console.info(
    `Formol Poll generation backend version ${BACKEND_VERSION} in ` +
    `${process.env.NODE_ENV || 'development'} environment.`
);
// Here the rest of the code...
process.on('beforeExit', code => {
    console.info('Backend is shutting down...')
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('Backend is running ...');
