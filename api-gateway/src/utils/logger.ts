import winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';

const { format } = winston
const { combine, timestamp, printf } = format

const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        logFormat,
        format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
        }),
        new winston.transports.File({
            filename: 'logs/debug.log',
            level: 'debug',
        }),
    ],
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    )
}

logger.add(
    new DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '1d',
    })
)

export default logger