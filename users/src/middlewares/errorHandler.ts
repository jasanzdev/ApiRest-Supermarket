import { ErrorRequestHandler, Response } from 'express'
import AppError from '../utils/appErrors'
import logger from '../utils/logger'
import { INTERNAL_SERVER_ERROR } from '../constants/http'

const HandleAppError = (res: Response, error: AppError) => {
    logger.error('App Error', {
        status: error.statusCode,
        errorCode: error.errorCode,
        message: error.message
    })
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AppError) {
        HandleAppError(res, error)
        return
    }

    logger.error('Unknown Error', {
        status: INTERNAL_SERVER_ERROR,
        message: error.message
    })

    res.status(500).json({ message: 'Internal Server Error' })
    next()
}
