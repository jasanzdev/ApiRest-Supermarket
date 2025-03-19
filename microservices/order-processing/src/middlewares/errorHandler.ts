import { ErrorRequestHandler, Response } from 'express'
import AppError from '../utils/appErrors'
import { AxiosError } from 'axios'
import { ErrorResponseData } from '../types/types'

const HandleAppError = (res: Response, error: AppError) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}

const HandleAxiosError = (error: AxiosError, res: Response) => {
    const response = error.response
    if (response) {
        const data = response.data as ErrorResponseData
        res.status(data.statusCode).json({ message: data.message, errorCode: data.errorCode })
        return
    }
    res.status(401).json({ message: 'An unknown server error occurred in Order Processing Service' })
}

export const ErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
    console.log('Handler error=>', error)

    if (error instanceof AppError) {
        HandleAppError(res, error)
        return
    }

    if (error instanceof AxiosError) {
        HandleAxiosError(error, res)
        return
    }

    res.status(500).json({ message: 'Internal Server Error' })

    next()
}
