import { ErrorRequestHandler, Response } from 'express'
import AppError from '../utils/appErrors'
import logger from '../utils/logger'

const HandleAppError = (res: Response, error: AppError) => {
    logger.log('error', `App Error: ${error.statusCode}:${error.message}--${error.errorCode}`)
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    logger.log('error', `Error: ${error.status}:${error.message}`)

    if (error instanceof AppError) {
        HandleAppError(res, error)
        return
    }

    res.status(500).json({ message: 'Internal Server Error' })

    next()
}
