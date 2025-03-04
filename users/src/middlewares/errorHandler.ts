import { ErrorRequestHandler } from "express";

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(error)

    res.status(500).json({ message: 'Internal Server Error' })

    next()
}
