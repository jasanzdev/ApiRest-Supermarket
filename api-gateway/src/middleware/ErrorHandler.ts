import { AxiosError } from 'axios'
import { ErrorRequestHandler, Request, Response } from 'express'
import logger from '../utils/logger'
import { User } from '../types/types.d'

interface ResponseData {
    user?: User,
    message?: string,
    errorCode?: string
}

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof AxiosError) {
        HandleAxiosError(error, req, res)
        return
    }

    logger.error('Unknown Error', {
        status: error.code,
        message: error.message
    })
    res.status(500).json({
        message: 'Internal server error'
    })
    next()
}


const HandleAxiosError = (error: AxiosError, req: Request, res: Response) => {
    const response = error.response
    if (response) {
        const data = response.data as ResponseData
        logger.error('Axios Error', {
            status: response.status,
            statusText: response.statusText,
            message: data.message
        })
        res.status(response.status).json({ message: data.message, errorCode: data.errorCode })
        return
    }
    logger.error('Axios Error', {
        status: error.code,
        message: error.message
    })
    res.status(401).json({ message: 'Access denied' })
}