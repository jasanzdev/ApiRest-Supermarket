import { RequestHandler } from 'express'
import redisClient from '../utils/redisClient'
import appAssert from '../utils/appAssert'
import { FORBIDDEN } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import CatchErrors from '../utils/catchErrors'

export const VerifySecretKey: RequestHandler = CatchErrors(async (req, res, next) => {
    const receiveSecretKey = req.headers['api_key']
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
    req.secret = receiveSecretKey
    next()
})
