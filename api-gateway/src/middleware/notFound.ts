import { Request, Response } from "express"

export const NotFound = ((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The ${req.method} route ${req.url} does not exist`
    })
})