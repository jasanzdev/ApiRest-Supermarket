import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } from "../constants/http";
import AppError from "../utils/appErrors";
import { SqlCodeError } from "../constants/codeSql";

const HandleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}

export const HandleError: ErrorRequestHandler = (error, req, res, next) => {
    console.log('Handle Error', error)

    if (error instanceof ZodError) {
        res.status(BAD_REQUEST).json(error.flatten().fieldErrors)
        return
    }

    if (error instanceof AppError) {
        HandleAppError(res, error)
        return
    }

    if (error.code && SqlCodeError.includes(error.code)) {
        console.log(error.code)
        res.status(CONFLICT).json({
            message: error.detail,
            errorCode: error.code,
        })
        return
    }

    res.status(INTERNAL_SERVER_ERROR).json('INternal Server Error')

    next()
}

export default HandleError
