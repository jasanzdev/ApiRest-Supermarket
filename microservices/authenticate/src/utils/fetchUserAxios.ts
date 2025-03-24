import axios from 'axios'
import { userServiceUrl } from '../constants/axios'
import { User } from '../dto/user'
import appAssert from './appAssert'
import { BAD_REQUEST, UNAUTHORIZED } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'

export const FetchUserByUsername = async (username: User['username'], receiveSecretKey: string) => {
    const url = `${userServiceUrl}usernameOrEmail`

    const response = await axios.get(`${url}/${username}`, {
        headers: {
            'X-API-KEY': receiveSecretKey,
        }
    })

    const user: User = response.data.user

    appAssert(
        user,
        BAD_REQUEST,
        'Invalid username or password',
        AppErrorCode.InvalidCredentials
    )

    return user
}

/**
 * Fetches a user by ID from an external service.
 * @param {User['id']} id - The ID of the user to fetch.
 * @param {string} receiveSecretKey - The secret API key for authentication.
 * @returns {Promise<User>} The user data.
 */
export const FetchUserById = async (id: User['id'], receiveSecretKey: string) => {
    const response = await axios.get(`${userServiceUrl}${id}`, {
        headers: {
            'X-API-KEY': receiveSecretKey,
        }
    })

    const { user } = response.data

    appAssert(
        user,
        UNAUTHORIZED,
        'Access not authorized, user does not exist',
        AppErrorCode.UserNotExist
    )

    return user
}

/**
 * Function to register a user via an external service.
 * @param {User} input - The user data to register.
 * @param {string} receiveSecretKey - The secret API key for authentication.
 * @returns {Promise<User>} The registered user data.
 */
export const RegisterUser = async (input: User, receiveSecretKey: string) => {
    const response = await axios.post(userServiceUrl, input, {
        headers: {
            'X-API-KEY': receiveSecretKey,
        }
    })

    const user: User = response.data.user

    return user
}

