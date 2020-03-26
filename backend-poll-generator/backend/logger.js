// This file will contains the code for the logger Winston.

const { createLogger, format, transports } = require('winston');

const myFormat = format.printf(
    ({ level, message, label, timestamp }) =>
        `[${label}] ${level.toUpperCase()} ${timestamp} - ${message}`
);

const logger = createLogger({
    format: format.combine(
        format.label({ label: 'formol-backend' }),
        format.timestamp(),
        myFormat
    ),
    transports: [new transports.Console()],
});

module.exports = logger;
