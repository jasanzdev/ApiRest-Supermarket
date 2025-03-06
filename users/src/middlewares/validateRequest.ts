import { NextFunction, Request, Response } from 'express'
import { ValidationError, validationResult } from 'express-validator'

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            message: 'validation failed',
            errors: errors.array().map((error: ValidationError) => {
                const field = 'path' in error ? error.path : 'unknown_field'
                return {
                    field: field,
                    message: error.msg,
                }
            }),
        })
        return
    }
    next()
}

