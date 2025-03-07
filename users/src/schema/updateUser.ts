import { Schema } from 'express-validator'
import { Roles } from '../constants/roles'
import UserModel from '../models/users'

export const UpdateSchema: Schema = {
    id: {
        in: ['params'],
        notEmpty: true,
        trim: true,
        isUUID: true,
        errorMessage: 'The id parameter must be a valid UUID'
    },
    name: {
        optional: true,
        isString: true,
        trim: true,
        notEmpty: true,
        escape: true,
        matches: {
            options: /^(?=.*[a-zA-Z]).{3,50}$/,
            errorMessage: 'The name must only have letters'
        }
    },
    email: {
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        escape: true,
        trim: true,
        custom: {
            options: async (value: string) => {
                const isEmailExists = await UserModel.findBy(value)
                if (!isEmailExists) {
                    return true
                }
                throw new Error('The email already exists')
            }
        }
    },
    password: {
        optional: true,
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
        }
    },
    role: {
        optional: true,
        trim: true,
        customSanitizer: {
            options: (value: string) => {
                return value ? value.toUpperCase() : value
            }
        },
        isIn: {
            options: [Roles],
            errorMessage: `The role must be one of the following: ${Roles.join(', ')}`,
        }
    }
}