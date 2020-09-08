const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file'); //keep logs in configured amount of time, or size
// https://youtu.be/PdVlAi7nrRU?t=399
require('winston-mongodb');

var transportError = new DailyRotateFile({
    filename: 'errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '1d',
    dirname: './logs',
    level: 'error',
    format: format.combine(format.timestamp(), format.simple())
});

const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: './logs/combined.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            db: process.env.MONGODB_CONN_STRING,
            level: 'error',
            collection: 'logs'
        }),
        transportError
    ]
});

module.exports = logger;