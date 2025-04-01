import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import logger from '../utils/logger'
import appAssert from '../utils/appAssert'
import { OK, UNAUTHORIZED } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import { RefreshTokenService, ValidateTokenServices } from '../services/tokensServices'
import { getCookieOptions } from '../utils/cookieOptions'

export default class ValidateTokensController {

    verifyToken: RequestHandler = CatchErrors(async (req, res) => {
        logger.info('Validating Token', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        })
        const accessToken = req.headers['authorization']
        const refreshToken = req.cookies['refresh_token']
        const receiveSecretKey = req.secret

        appAssert(
            accessToken && receiveSecretKey && refreshToken,
            UNAUTHORIZED,
            'Access denied, No tokens provider',
            AppErrorCode.NoTokenProvider)

        const { publicUser, newAccessToken, newRefreshToken } = await ValidateTokenServices(accessToken, refreshToken, receiveSecretKey)

        if (newAccessToken && newRefreshToken) {
            res.setHeader('Authorization', newAccessToken)
            res.cookie('refresh_token', newRefreshToken, getCookieOptions())
        }

        res.status(OK).json({
            message: 'Tokens verified successfully.',
            user: publicUser
        })
    })

    refreshToken: RequestHandler = CatchErrors(async (req, res) => {
        logger.info('Refreshing Token', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        })
        const refreshToken = req.cookies['refresh_token']
        const receiveSecretKey = req.secret

        appAssert(
            refreshToken && receiveSecretKey,
            UNAUTHORIZED,
            'Access denied, Not token provider',
            AppErrorCode.NoTokenProvider
        )

        const { publicUser, newAccessToken, newRefreshToken } = await RefreshTokenService(refreshToken, receiveSecretKey)

        res.setHeader('Authorization', newAccessToken)
        res.cookie('refresh_token', newRefreshToken, getCookieOptions())

        res.status(OK).json({
            message: 'Tokens refreshed successfully.',
            user: publicUser
        })
    })
}
