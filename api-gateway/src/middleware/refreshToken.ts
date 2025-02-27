import { RequestHandler } from "express"
import CatchErrors from "../utils/catchErrors"
import logger from "../utils/logger"
import { NewAccessTokenServices } from "../services/newAccessToken"

export const GetNewAccessToken: RequestHandler = CatchErrors(async (req, res, next) => {
    logger.log('info', 'Getting new Access Token')
    const refreshToken = req.cookies.refresh_token
    const userAgent = req.headers['user-agent'] as string

    const { newRefreshToken, newAccessToken, user } = await NewAccessTokenServices(refreshToken, userAgent)

    res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })
    res.setHeader('Authorization', newAccessToken)
    req.user = user
    next()
})