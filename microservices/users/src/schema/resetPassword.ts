import { Schema } from 'express-validator'

export const ResetPassword: Schema = {
    id: {
        in: ['params'],
        notEmpty: true,
        trim: true,
        isUUID: true,
        errorMessage: 'The id parameter must be a valid UUID'
    },
    newPassword: {
        isString: true,
        trim: true,
        escape: true,
        isLength: {
            options: { min: 6, max: 12 },
            errorMessage: 'The password must be a string with a length between 6 and 12 characters.'
        },
        matches: {
            options: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@!#$.,/*&%+<>()]).{6,12}$/,
            errorMessage: 'The password to have at least one especial character, letters and numbers'
        },
        custom: {
            options: (value, { req }) => {
                if (value === req.body.password) {
                    throw new Error('The password and newPassword cannot be the same')
                }
                return true
            },
            errorMessage: 'The password and newPassword cannot be the same'
        }
    },
    confirm: {
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('New password and confirm password do not match.')
                }
                return true
            },
            errorMessage: 'New password and confirm password do not match.'
        }
    }
}