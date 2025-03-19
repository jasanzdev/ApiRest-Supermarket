import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import appAssert from '../utils/appAssert'
import { FORBIDDEN, UNAUTHORIZED } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import redisClient from '../utils/redisClient'
import { User } from '../types/types'

export const ValidateApiAccess: RequestHandler = CatchErrors(async (req, res, next) => {
    const receiveSecretKey = req.headers['x-api-key']
    const userHeader = req.headers['x-user']
    const user: User = typeof userHeader === 'string' ? JSON.parse(userHeader) : undefined

    appAssert(
        user,
        UNAUTHORIZED,
        'Authentication is required to perform this action.',
        AppErrorCode.AccessDenied
    )

    appAssert(
        receiveSecretKey,
        FORBIDDEN,
        'Access not authorized',
        AppErrorCode.AccessDenied
    )

    const storeSecretKey = await redisClient.get('secret_api_key')

    appAssert(
        receiveSecretKey === storeSecretKey,
        FORBIDDEN,
        'Access not authorized',
        AppErrorCode.AccessDenied
    )

    req.user = user
    req.secret = receiveSecretKey
    next()
})
