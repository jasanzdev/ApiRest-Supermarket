import { Schema } from 'express-validator'
import { Roles } from '../constants/roles'
import UserModel from '../models/users'

export const CreateSchema: Schema = {
    name: {
        isString: true,
        trim: true,
        notEmpty: true,
        escape: true,
        matches: {
            options: /^(?=.*[a-zA-Z]).{3,50}$/,
            errorMessage: 'The name must only have letters'
        }
    },
    username: {
        isString: true,
        trim: true,
        notEmpty: true,
        escape: true,
        isLength: {
            options: { min: 3, max: 15 },
            errorMessage: 'The username must be a string with a length between 3 and 15 characters.'
        },
        matches: {
            options: /^[^A-Z\s]+$/,
            errorMessage: 'The name must only have lowercase letters'
        },
        custom: {
            options: async (value: string) => {
                const isUsernameExists = await UserModel.findBy(value)
                if (!isUsernameExists) {
                    return true
                }
                throw new Error('The username already exists')
            }
        }
    },
    email: {
        isEmail: true,
        errorMessage: 'Invalid email format. Please ensure your email address follows the correct structure: name@domain.com',
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
        trim: true,
        customSanitizer: {
            options: (value: string) => {
                return value ? value.toUpperCase() : 'USER'
            }
        },
        isIn: {
            options: [Roles],
            errorMessage: `The role must be one of the following: ${Roles.join(', ')}`,
        }
    }
}