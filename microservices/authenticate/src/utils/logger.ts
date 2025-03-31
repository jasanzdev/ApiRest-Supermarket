import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { envs } from '../config/config'

const { format } = winston
const { combine, timestamp, json } = format

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        json()
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

if (!envs.isProduction) {
    logger.add(new winston.transports.Console({
        format: combine(
            format.colorize(),
            format.simple()
        ),
    }))
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