import { RequestHandler } from 'express'
import appAssert from '../utils/appAssert'
import { FORBIDDEN } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import CatchErrors from '../utils/catchError'
import redisClient from '../config/redisClient'

export const VerifySecretKey: RequestHandler = CatchErrors(async (req, res, next) => {
    const receiveSecretKey = req.headers['x-api-key']

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

    next()
})
