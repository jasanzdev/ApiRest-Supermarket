import { RequestHandler } from 'express'
import redisClient from '../utils/redisClient'
import appAssert from '../utils/appAssert'
import { UNAUTHORIZED } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import CatchErrors from '../utils/catchErrors'

/**
 * Middleware to verify the secret API key provided in the request headers.
 * @type {RequestHandler}
 */
export const VerifySecretKey: RequestHandler = CatchErrors(async (req, res, next) => {
    const receiveSecretKey = req.headers['x-api-key']

    appAssert(
        receiveSecretKey,
        UNAUTHORIZED,
        'Unauthorized. Missing or invalid secret-key.',
        AppErrorCode.InvalidSecretKey
    )

    const storeSecretKey = await redisClient.get('secret_api_key')

    appAssert(
        receiveSecretKey === storeSecretKey,
        UNAUTHORIZED,
        'Unauthorized. Missing or invalid secret-key.',
        AppErrorCode.AccessDenied
    )
    req.secret = receiveSecretKey
    next()
})
