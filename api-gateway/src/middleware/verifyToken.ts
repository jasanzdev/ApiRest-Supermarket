import CatchErrors from '../utils/catchErrors'
import logger from '../utils/logger'
import { RequestHandler } from 'express'
import { VerifyAccessTokenServices } from '../services/verifyAccessToken'


export const VerifyToken: RequestHandler = CatchErrors(async (req, res, next) => {
    logger.info('Verifying Token', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    })
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies.refresh_token
    const apiSecretKey = req.secret as string

    if (refreshToken && accessToken) {
        const { newRefreshToken, newAccessToken, user } = await VerifyAccessTokenServices(accessToken, refreshToken, apiSecretKey)

        if (newRefreshToken && newAccessToken) {
            res.cookie('refresh_token', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
            res.setHeader('Authorization', newAccessToken)
        }
        req.user = user
        next()
        return
    }
    next()
})