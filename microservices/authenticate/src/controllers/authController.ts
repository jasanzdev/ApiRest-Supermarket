import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import { OK } from '../constants/http'
import { LoginService, LogoutService, RegisterService } from '../services/authServices'
import { getCookieOptions } from '../utils/cookieOptions'
import logger from '../utils/logger'
import { PublicUser } from '../types/types.d'
import { User } from '../dto/user'

export class AuthenticationController {
    static readonly login: RequestHandler = CatchErrors(async (req, res) => {
        logger.info('Login User', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        })

        const user = req.user as User
        const userAgent = req.headers['user-agent'] as string

        const { accessToken, refreshToken } = await LoginService(user, userAgent)

        res.setHeader('Authorization', accessToken)
        res.cookie('refresh_token', refreshToken, getCookieOptions())

        res.status(OK).json({
            message: 'Login successfully',
            user: user
        })
    })

    /**
     * Controller method to handle user registration and token generation.
     * @type {RequestHandler}
     */
    static readonly register: RequestHandler = CatchErrors(async (req, res) => {
        logger.info('Register User', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        })
        const userAgent = req.headers['user-agent'] as string
        const receiveSecretKey = req.secret as string

        const { publicUser, accessToken, refreshToken } = await RegisterService(req.body, userAgent, receiveSecretKey)

        res.setHeader('Authorization', accessToken)
        res.cookie('refresh_token', refreshToken, getCookieOptions())
        req.user = publicUser as PublicUser
        res.status(OK).json({
            message: 'Register successfully',
            user: publicUser
        })
    })

    /**
     * Controller method to handle user logout.
     * @type {RequestHandler}
     */
    static readonly logout: RequestHandler = CatchErrors(async (req, res) => {
        const refreshToken = req.cookies['refresh_token']
        await LogoutService(refreshToken)

        res.clearCookie('refresh_token')
        res.status(200).json({ message: 'Logout successfully' })
    })
};
