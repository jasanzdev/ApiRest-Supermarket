import { Request, Response } from "express";
import axios from "axios";
import { CookiesHandler } from "../utils/handlerCookie";

export class Authenticate {
    static readonly verifyToken = async (req: Request, res: Response) => {
        const accessToken = req.cookies.access_token

        if (!accessToken) {
            return this.getNewAccessToken(req, res)
        }

        if (accessToken) {
            const response = await axios.get('http://localhost:4000/verify-token', {
                headers: { 'Cookie': `access_token=${accessToken}` }
            })
            const { user } = response.data
            return user
        }
        return null
    }

    static readonly getNewAccessToken = async (req: Request, res: Response) => {

        const refreshToken = req.cookies.refresh_token
        const userAgent = req.headers['user-agent'] as string

        if (!refreshToken) return null

        const response = await axios.get('http://localhost:4000/refresh-token', {
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
        return null
    }
}
