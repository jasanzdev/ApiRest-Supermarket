import { AxiosError } from "axios";
import { ErrorRequestHandler, Response } from "express";
import logger from "../utils/logger";
import { User } from "../types/user";

interface ResponseData {
    user?: User,
    message?: string,
    errorCode?: string
}

const HandleAxiosError = (error: AxiosError, res: Response) => {
    const response = error.response
    if (response) {
        const data = response.data as ResponseData
        logger.log('error', `Axios Error: ${response.status} ${response.statusText}`)
        res.status(401).json(data.message)
        return
    }
    logger.log('error', `Axios Error: ${error.code} ${error.message}`)
    res.status(403).json({ message: 'Access denied' })
}

export const ErrorHandler: ErrorRequestHandler = (error, req, res) => {

    if (error instanceof AxiosError) {
        HandleAxiosError(error, res)
        return
    }

    logger.log('error', `Unknown Error: ${error.code} ${error.message}`)
    res.status(500).json({
        message: error.message
    })
}
