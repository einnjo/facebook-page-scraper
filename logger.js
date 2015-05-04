'use strict';
var winston = require('winston');

// Level priority: silly, debug, verbose, info, warn, error.
module.exports = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.File)({
            filename: 'info.log',
            name:'file.all',
            level:'info',
            maxsize: 124000000,
            maxFiles: 10,
            handleExceptions: true,
            json: true,
            prettyPrint: true
      }),
        new (winston.transports.File)({
            filename: 'error.log',
            name:'file.error',
            level:'error',
            maxsize: 124000000,
            maxFiles: 1,
            handleExceptions: true,
            json: true,
            prettyPrint: true
        })
    ]
});
