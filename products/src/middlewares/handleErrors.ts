import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } from "../constants/http";
import AppError from "../utils/appErrors";
import { SqlCodeError } from "../constants/codeSql";
import logger from "../utils/logger";

const HandleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}

export const HandleError: ErrorRequestHandler = (error, req, res, next) => {
    console.log('Handle Error', error)

    if (error instanceof ZodError) {
        logger.log('error', `Zod Error: BAD_REQUEST:${BAD_REQUEST}
             ${JSON.stringify(error.flatten().fieldErrors)}`)
        res.status(BAD_REQUEST).json(error.flatten().fieldErrors)
        return
    }

    if (error instanceof AppError) {
        logger.log('error', `App Error: ${error.statusCode} ${error.message}`)
        HandleAppError(res, error)
        return
    }

    if (error.code && SqlCodeError.includes(error.code)) {
        logger.log('error', `SQL Error: ${error.code} ${error.detail}`)
        res.status(CONFLICT).json({
            message: error.detail,
            errorCode: error.code,
        })
        return
    } else {
        logger.log('error', `Unknown Error: INTERNAL_SERVER_ERROR:${INTERNAL_SERVER_ERROR} ${error.message}`)
        res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }

    next()
}

export default HandleError
