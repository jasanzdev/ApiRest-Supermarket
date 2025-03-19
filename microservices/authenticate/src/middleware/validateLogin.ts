import bcrypt from 'bcryptjs'
import appAssert from '../utils/appAssert'
import CatchErrors from '../utils/catchErrors'
import AppErrorCode from '../constants/appErrorCode'
import { BAD_REQUEST } from '../constants/http'
import { RequestHandler } from 'express'
import { User } from '../dto/user'
import { toPublishUser } from '../utils/userToPublish'
import { FetchUserByUsername } from '../utils/fetchUserAxios'
<<<<<<< HEAD
import { PublicUser } from '../types/types.d'
=======
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd

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

<<<<<<< HEAD
    req.user = toPublishUser(user) as PublicUser
=======
    req.user = toPublishUser(user)
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd

    next()
})
