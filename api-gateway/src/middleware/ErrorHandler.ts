import { AxiosError } from "axios";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { User } from "../types/user";

interface ResponseData {
    user?: User,
    message?: string,
    errorCode?: string
}

const HandleAxiosError = (error: AxiosError, req: Request, res: Response, next: NextFunction) => {
    const response = error.response
    if (response) {
        const data = response.data as ResponseData
        logger.log('error', `Axios Error: ${response.status} ${response.statusText}`)
        res.status(response.status).json({ message: data.message, errorCode: data.errorCode })
        return
    }
    logger.log('error', `Axios Error: ${error.code} ${error.message}`)
    res.status(401).json({ message: 'Access denied' })
}

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AxiosError) {
        HandleAxiosError(error, req, res, next)
        return
    }

    logger.log('error', `Unknown Error: ${error.code} ${error.message}`)
    res.status(500).json({
        message: error.message
    })
    next()
}
