import { NextFunction, Request, Response } from 'express'
import { body, ValidationError, validationResult } from 'express-validator'

const ValidateRequestCart =
    [
        (req: Request, res: Response, next: NextFunction) => {
            if (!Array.isArray(req.body)) {
                req.body = [req.body]
            }
            next()
        },

        body('*.productId')
            .isUUID()
            .withMessage('ProductId must be a valid UUID'),
        body('*.quantity')
            .isInt({ min: 1 })
            .toInt()
            .withMessage('Quantity must be a positive integer'),

        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req)
            console.log(errors.array())
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
        },
    ]

export default ValidateRequestCart