import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import { UNAUTHORIZED } from '../constants/http'
import appAssert from '../utils/appAssert'
import AppErrorCode from '../constants/appErrorCode'
import { verifyAccessToken } from '../utils/jwt'
import axios from 'axios'
import { userServiceUrl } from '../constants/axios'
import { toPublishUser } from '../utils/userToPublish'

export const Authenticate: RequestHandler = CatchErrors(async (req, res, next) => {
    const accessToken = req.headers['authorization']

    appAssert(
        accessToken,
        UNAUTHORIZED,
        'Access denied, access token not provider',
        AppErrorCode.InvalidToken
    )

    const { userId } = verifyAccessToken(accessToken)
    const response = await axios.get(`${userServiceUrl}${userId}`)

    const { user } = response.data

    appAssert(
        user,
        UNAUTHORIZED,
        'Access denied, User not found',
        AppErrorCode.UserNotExist
    )

    req.user = toPublishUser(user)
    next()
})

