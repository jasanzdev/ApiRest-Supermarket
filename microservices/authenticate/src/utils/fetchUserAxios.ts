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


export const RegisterUser = async (input: User, receiveSecretKey: string) => {
    const response = await axios.post(userServiceUrl, input, {
        headers: {
            'X-API-KEY': receiveSecretKey,
        }
    })

    const user: User = response.data.user

    return user
}

