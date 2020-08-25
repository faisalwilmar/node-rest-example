const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file'); //keep logs in configured amount of time, or size

var transportError = new DailyRotateFile({
    filename: 'errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '1d',
    dirname: './logs',
    level: 'error',
    format: format.combine(format.timestamp(), format.json())
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