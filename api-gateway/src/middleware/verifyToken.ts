import CatchErrors from "../utils/catchErrors";
import logger from "../utils/logger";
import { RequestHandler } from "express";
import { VerifyAccessTokenServices } from "../services/verifyAccessToken";


export const VerifyToken: RequestHandler = CatchErrors(async (req, res, next) => {
    logger.log('info', `Verifying Token: ${req.method} ${req.url}`)
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies.refresh_token

    if (refreshToken && accessToken) {
        const { newRefreshToken, newAccessToken, user } = await VerifyAccessTokenServices(accessToken, refreshToken)

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
    }
})