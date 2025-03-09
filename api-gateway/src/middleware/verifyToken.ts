import CatchErrors from '../utils/catchErrors'
import logger from '../utils/logger'
import { RequestHandler } from 'express'
import RefreshTokenService from '../services/refreshToken'
import VerifyAccessTokenService from '../services/verifyAccessToken'


export const VerifyToken: RequestHandler = CatchErrors(async (req, res, next) => {
    logger.info('Verifying Token', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    })
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies['refresh_token']
    const apiSecretKey = req.secret as string

    const refresh = refreshToken ? 'onlyRefreshToken' : 'bothUndefined'
    const handlerKey = accessToken && refreshToken ? 'bothDefined' : refresh

    const tokenHandlers = {
        bothDefined: async () => {
            const { newRefreshToken, newAccessToken, user } = await VerifyAccessTokenService(accessToken as string, refreshToken, apiSecretKey)

            if (newAccessToken && newRefreshToken) {
                res.cookie('refresh_token', newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                })
                res.setHeader('Authorization', newAccessToken)
            }

            req.user = user
            next()
        },
        onlyRefreshToken: async () => {
            const { newRefreshToken, newAccessToken, user } = await RefreshTokenService(refreshToken, apiSecretKey)

            res.cookie('refresh_token', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
            res.setHeader('Authorization', newAccessToken)

            req.user = user
            next()
        },
        bothUndefined: () => {
            next()
        }
    }

    await tokenHandlers[handlerKey]()
})