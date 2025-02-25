import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR } from "../constants/http";
import AppError from "../utils/appErrors";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import AppErrorCode from "../constants/appErrorCode";
import logger from "../utils/logger";

const { JsonWebTokenError } = jwt

const HandleAppError = (res: Response, error: AppError) => {
    logger.log('error', `App Error: ${error.statusCode} ${error.message}`)
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}

const HandleJwtError = (res: Response, error: Error) => {
    logger.log('error', `JsonWebToken Error: ${AppErrorCode.InvalidToken} ${error.message}`)
    if (error.message === 'jwt expired') {
        res.status(FORBIDDEN).json({
            message: 'Token Expired',
            errorCode: AppErrorCode.AccessTokenExpired
        })
    } else {
        res.status(FORBIDDEN).json({
            message: 'Invalid token provide',
            errorCode: AppErrorCode.InvalidToken
        })
    }
}

export const HandleError: ErrorRequestHandler = (error, req, res, next) => {

    if (error instanceof ZodError) {
        logger.log('error', `App Error: ${AppErrorCode.BadRequest}
             ${JSON.stringify(error.flatten().fieldErrors)}`)

        res.status(BAD_REQUEST).json({
            message: error.flatten().fieldErrors,
            errorCode: AppErrorCode.BadRequest
        })
        return
    }

    if (error instanceof AppError) {
        HandleAppError(res, error)
        return
    }

    if (error instanceof JsonWebTokenError) {
        HandleJwtError(res, error)
        return
    }

    logger.log('error', `Unknown Error: ${AppErrorCode.InternalServerError} ${error.message}`)
    res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
        errorCode: AppErrorCode.InternalServerError
    })

    next()
}

export default HandleError
