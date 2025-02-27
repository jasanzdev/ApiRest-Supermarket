import { MethodsRequireAuth } from "../constants/methods";
import CatchErrors from "../utils/catchErrors";
import logger from "../utils/logger";
import { GetNewAccessToken } from "./refreshToken";
import { RequestHandler } from "express";
import { VerifyAccessTokenServices } from "../services/verifyAccessToken";


export const VerifyToken: RequestHandler = CatchErrors(async (req, res, next) => {
    if (MethodsRequireAuth.includes(req.method)) {
        logger.log('info', `Verifying Token: ${req.method} ${req.url}`)
        const accessToken = req.headers['authorization']
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken && !accessToken) {
            logger.log('error', `Not token Provider: ${req.method} ${req.url}`)
            res.status(401).json({ message: 'Access Denied, No token provider' })
            return
        }

        if (!accessToken) {
            await GetNewAccessToken(req, res, next)
        } else {
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
    } else {
        next()
    }
})