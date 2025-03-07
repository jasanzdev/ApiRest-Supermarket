import { Request, Response } from 'express'
import CatchErrors from '../utils/catchErrors'
import appAssert from '../utils/appAssert'
import { OK, UNAUTHORIZED } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import { ValidateTokenServices } from '../services/verifyTokens'
import { getCookieOptions } from '../utils/cookieOptions'
import logger from '../utils/logger'

export const ValidateToken = CatchErrors(async (req: Request, res: Response) => {
    logger.info('Validating Token', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    })
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies['refresh_token']
    const receiveSecretKey = req.secret as string

    appAssert(accessToken,
        UNAUTHORIZED,
        'Access denied, No token provider',
        AppErrorCode.NoTokenProvider)

    const { publicUser, newAccessToken, newRefreshToken } = await ValidateTokenServices(accessToken, refreshToken, receiveSecretKey)

    if (newAccessToken && newRefreshToken) {
        res.setHeader('Authorization', newAccessToken)
        res.cookie('refresh_token', newRefreshToken, getCookieOptions())
    }

    res.status(OK).json({ user: publicUser })
})

