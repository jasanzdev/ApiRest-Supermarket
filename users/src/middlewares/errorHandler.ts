import { ErrorRequestHandler, Response } from 'express'
import AppError from '../utils/appErrors'

const HandleAppError = (res: Response, error: AppError) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log('Handle Error:', error)

    if (error instanceof AppError) {
        HandleAppError(res, error)
        return
    }

    res.status(500).json({ message: 'Internal Server Error' })

    next()
}
