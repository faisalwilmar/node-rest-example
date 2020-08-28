const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file'); //keep logs in configured amount of time, or size

var transportError = new DailyRotateFile({
    filename: 'errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '2d',
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
        transportError
    ]
});

module.exports = logger;