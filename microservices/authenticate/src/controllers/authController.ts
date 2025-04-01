import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import { OK } from '../constants/http'
import { getCookieOptions } from '../utils/cookieOptions'
import logger from '../utils/logger'
import { PublicUser, User } from '../types/types.d'
import { AuthService } from '../services/authServices'

export class AuthenticationController {
    constructor(private readonly authService: AuthService) { }

    login: RequestHandler = CatchErrors(async (req, res) => {
        logger.info('Login User', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        })

        const user = req.user as User
        const userAgent = req.headers['user-agent'] as string

        const { accessToken, refreshToken } = await this.authService.loginService(user, userAgent)

        res.setHeader('Authorization', accessToken)
        res.cookie('refresh_token', refreshToken, getCookieOptions())

        res.status(OK).json({
            message: 'Login successfully',
            user: user
        })
    })


    register: RequestHandler = CatchErrors(async (req, res) => {
        logger.info('Register User', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        })
        const userAgent = req.headers['user-agent'] as string
        const receiveSecretKey = req.secret as string

        const { publicUser, accessToken, refreshToken } = await this.authService.registerService(req.body, userAgent, receiveSecretKey)

        res.setHeader('Authorization', accessToken)
        res.cookie('refresh_token', refreshToken, getCookieOptions())
        req.user = publicUser as PublicUser
        res.status(OK).json({
            message: 'Register successfully',
            user: publicUser
        })
    })

    logout: RequestHandler = CatchErrors(async (req, res) => {
        const refreshToken = req.cookies['refresh_token']
        await this.authService.logoutService(refreshToken)

        res.clearCookie('refresh_token')
        res.status(200).json({ message: 'Logout successfully' })
    })
};
