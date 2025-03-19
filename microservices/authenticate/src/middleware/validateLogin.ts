import bcrypt from 'bcryptjs'
import appAssert from '../utils/appAssert'
import CatchErrors from '../utils/catchErrors'
import AppErrorCode from '../constants/appErrorCode'
import { BAD_REQUEST } from '../constants/http'
import { RequestHandler } from 'express'
import { User } from '../dto/user'
import { toPublishUser } from '../utils/userToPublish'
import { FetchUserByUsername } from '../utils/fetchUserAxios'
import { PublicUser } from '../types/types.d'

export const ValidateLogin: RequestHandler = CatchErrors(async (req, res, next) => {
    const { username, password } = req.body
    const receiveSecretKey = req.secret as string

    appAssert(
        username && password,
        BAD_REQUEST,
        'The username && password is require',
        AppErrorCode.BadRequest
    )

    const user: User = await FetchUserByUsername(username, receiveSecretKey)

    const isValidPass = await bcrypt.compare(password, user.password)

    appAssert(
        isValidPass,
        BAD_REQUEST,
        'Invalid username or password',
        AppErrorCode.InvalidCredentials
    )

    req.user = toPublishUser(user) as PublicUser

    next()
})
