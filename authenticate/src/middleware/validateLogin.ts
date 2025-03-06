import axios from 'axios'
import bcrypt from 'bcryptjs'
import appAssert from '../utils/appAssert'
import CatchErrors from '../utils/catchErrors'
import AppErrorCode from '../constants/appErrorCode'
import { BAD_REQUEST } from '../constants/http'
import { RequestHandler } from 'express'
import { userServiceUrl } from '../constants/axios'
import { User } from '../dto/user'
import { toPublishUser } from '../utils/userToPublish'

export const ValidateLogin: RequestHandler = CatchErrors(async (req, res, next) => {
    const { username, password } = req.body

    appAssert(
        username && password,
        BAD_REQUEST,
        'The username && password is require',
        AppErrorCode.BadRequest
    )

    const url = `${userServiceUrl}usernameOrEmail`
    const response = await axios.get(`${url}/${username}`)

    const user: User = response.data.user

    appAssert(
        user,
        BAD_REQUEST,
        'Invalid username or password',
        AppErrorCode.InvalidCredentials
    )

    const isValidPass = await bcrypt.compare(password, user.password)

    appAssert(
        isValidPass,
        BAD_REQUEST,
        'Invalid username or password',
        AppErrorCode.InvalidCredentials
    )

    req.user = toPublishUser(user)
    next()
})
