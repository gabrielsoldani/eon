'use strict';

const winston = require('winston');
winston.emitErrs = true;

let logger = new winston.Logger({
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' })
    ],
    exitOnError: false
});

logger.cli();

module.exports = logger;
