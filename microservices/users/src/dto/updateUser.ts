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
    role: {
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