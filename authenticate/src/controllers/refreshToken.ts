import { Request, Response } from 'express'
import { OK, UNAUTHORIZED } from '../constants/http'
import { getCookieOptions } from '../utils/cookieOptions'
import appAssert from '../utils/appAssert'
import { RefreshTokenService } from '../services/verifyTokens'
import AppErrorCode from '../constants/appErrorCode'
import CatchErrors from '../utils/catchErrors'
import logger from '../utils/logger'

export const RefreshToken = CatchErrors(async (req: Request, res: Response) => {
    logger.info('Refreshing Token', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    })
    const refreshToken = req.cookies['refresh_token']
    const receiveSecretKey = req.secret as string

    appAssert(
        refreshToken,
        UNAUTHORIZED,
        'Access denied, Not token provider',
        AppErrorCode.NoTokenProvider
    )

    const { publicUser, newAccessToken, newRefreshToken } = await RefreshTokenService(refreshToken, receiveSecretKey)

    res.setHeader('Authorization', newAccessToken)
    res.cookie('refresh_token', newRefreshToken, getCookieOptions())

    res.status(OK).json({ user: publicUser })
})
