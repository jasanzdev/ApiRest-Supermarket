import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR } from "../constants/http";
import AppError from "../utils/appErrors";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import AppErrorCode from "../constants/appErrorCode";

const { JsonWebTokenError } = jwt

const HandleAppError = (res: Response, error: AppError) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}

const HandleJwtError = (res: Response, error: Error) => {
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
    console.log('Handle Error', error)

    if (error instanceof ZodError) {
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

    res.status(INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
        errorCode: AppErrorCode.InternalServerError
    })

    next()
}

export default HandleError
