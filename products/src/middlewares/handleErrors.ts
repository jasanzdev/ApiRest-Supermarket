import { ErrorRequestHandler, Response } from 'express'
import { ZodError } from 'zod'
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } from '../constants/http'
import AppError from '../utils/appErrors'
import { SqlCodeError } from '../constants/codeSql'
import logger from '../utils/logger'

const HandleAppError = (res: Response, error: AppError) => {
    logger.error('App Error', {
        status: error.statusCode,
        errorCode: error.errorCode,
        message: error.message
    })
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}

export const HandleError: ErrorRequestHandler = (error, req, res, next) => {
    console.log('Handle Error', error)

    if (error instanceof ZodError) {
        logger.error('Validating Error', {
            errorCode: BAD_REQUEST,
            errors: error.flatten().fieldErrors
        })
        res.status(BAD_REQUEST).json(error.flatten().fieldErrors)
        return
    }

    if (error instanceof AppError) {
        logger.log('error', `App Error: ${error.statusCode} ${error.message}`)
        HandleAppError(res, error)
        return
    }

    if (error.code && SqlCodeError.includes(error.code)) {
        logger.error('App Error', {
            status: error.code,
            message: error.detail
        })
        res.status(CONFLICT).json({
            message: error.detail,
            errorCode: error.code,
        })
        return
    } else {
        logger.error('Unknown Error', {
            status: INTERNAL_SERVER_ERROR,
            message: error.message
        })
        res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }

    next()
}

export default HandleError
