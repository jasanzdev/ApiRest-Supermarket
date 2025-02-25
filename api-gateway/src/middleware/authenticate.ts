import { Request, Response } from "express";
import axios from "axios";
import { CookiesHandler } from "../utils/handlerCookie";
import { NextFunction } from "http-proxy-middleware/dist/types";
import { MethodsRequireAuth } from "../constants/methods";
import CatchErrors from "../utils/catchErrors";
import logger from "../utils/logger";


export const VerifyToken = CatchErrors(async (req: Request, res: Response, next: NextFunction) => {
    if (MethodsRequireAuth.includes(req.method)) {
        logger.log('info', `Verifying Token: ${req.method} ${req.url}`)
        const accessToken = req.cookies.access_token
        const refreshToken = req.cookies.refresh_token

        if (!accessToken && !refreshToken) {
            logger.log('error', `Not token Provider: ${req.method} ${req.url}`)
            res.status(403).json({ message: 'Access not authorized' })
            return
        }

        if (accessToken) {

            const verifyTokenUrl = process.env.NODE_ENV === 'production'
                ? 'http://authentication:4000/verify-token' : 'http://localhost:4000/verify-token'

            const response = await axios.get(verifyTokenUrl, {
                headers: { 'Cookie': `access_token=${accessToken}` }
            })
            const { user } = response.data
            req.user = user
            next()
            return
        }

        const userAgent = req.headers['user-agent'] as string
        const user = await GetNewAccessToken(refreshToken, userAgent, res)
        req.user = user
        next()
    }
    next()
})

const GetNewAccessToken = async (refreshToken: string, userAgent: string, res: Response) => {
    logger.log('info', 'Getting new Access Token')

    const refreshTokenUrl = process.env.NODE_ENV === 'production'
        ? 'http://authentication:4000/refresh-token' : 'http://localhost:4000/refresh-token'

    const response = await axios.get(refreshTokenUrl, {
        headers: {
            'Cookie': `refresh_token=${refreshToken}`,
            'User-Agent': userAgent
        }
    })

    const setCookies = response.headers['set-cookie']

    if (setCookies) {
        const newAccessToken = CookiesHandler(setCookies)
        if (newAccessToken) {
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
            const { user } = response.data
            return user
        }
    }
}
