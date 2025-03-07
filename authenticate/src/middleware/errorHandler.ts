import { ErrorRequestHandler, Response } from 'express'
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNPROCESSABLE_CONTENT } from '../constants/http'
import AppError from '../utils/appErrors'
import { ZodError } from 'zod'
import jwt from 'jsonwebtoken'
import AppErrorCode from '../constants/appErrorCode'
import logger from '../utils/logger'
import { RefreshToken } from '../controllers/refreshToken'
import { AxiosError } from 'axios'

const { JsonWebTokenError } = jwt

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

const HandleJwtError = (res: Response, error: Error) => {
    logger.error('JsonWebToken Error', {
        error: error.name,
        errorCode: AppErrorCode.InvalidToken,
        message: error.message
    })
    if (error.message === 'jwt expired') {
        res.status(UNAUTHORIZED).json({
            message: 'Token Expired',
            errorCode: AppErrorCode.AccessTokenExpired
        })
        return RefreshToken
    } else {
        res.status(UNAUTHORIZED).json({
            message: 'Invalid token provide',
            errorCode: AppErrorCode.InvalidToken
        })
    }
}

export const HandleError: ErrorRequestHandler = (error, req, res, next) => {

    if (error instanceof ZodError) {
        logger.error('Validating Error', {
            errorCode: AppErrorCode.BadRequest,
            errors: error.flatten().fieldErrors
        })

        res.status(UNPROCESSABLE_CONTENT).json({
            message: error.flatten().fieldErrors,
            errorCode: AppErrorCode.BadRequest
        })
        return
    }

    if (error instanceof AppError) {
        HandleAppError(res, error)
        return
    }

    if (error instanceof AxiosError) {
        logger.error('Axios Error', {
            status: error.status,
            statusText: error.response?.statusText,
            error: error.response?.data
        })
        res.status(UNAUTHORIZED).json({ message: 'User not authorized' })
        return
    }

    if (error instanceof JsonWebTokenError) {
        HandleJwtError(res, error)
        return
    }

    logger.error('Unknown Error', {
        status: AppErrorCode.InternalServerError,
        message: error.message
    })
    res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
        errorCode: AppErrorCode.InternalServerError
    })

    next()
}

export default HandleError
