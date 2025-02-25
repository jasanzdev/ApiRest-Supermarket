"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { format } = winston_1.default;
const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: combine(timestamp(), logFormat, format.json()),
    transports: [
        new winston_1.default.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston_1.default.transports.File({
            filename: 'logs/info.log',
            level: 'info',
        }),
        new winston_1.default.transports.File({
            filename: 'logs/debug.log',
            level: 'debug',
        }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
logger.add(new winston_daily_rotate_file_1.default({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '1d',
}));
exports.default = logger;
