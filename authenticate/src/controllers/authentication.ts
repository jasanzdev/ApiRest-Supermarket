import { RequestHandler } from "express";
import CatchErrors from "../utils/catchErrors";
import { CONFLICT, OK } from "../constants/http";
import { LoginService, LogoutService, RegisterService } from "../services/authentication";
import { getCookieOptions } from "../utils/cookieOptions";
import appAssert from "../utils/appAssert";
import { validateUser } from "../schemas/user";
import { User } from "../types/user";
import AppErrorCode from "../constants/appErrorCode";

export class AuthenticationController {

    static readonly login: RequestHandler = CatchErrors(async (req, res) => {
        const user = req.user
        const userAgent = req.headers['user-agent'] as string

        appAssert(user, CONFLICT, 'User not provide', AppErrorCode.UserNotExist)

        const { accessToken, refreshToken } = await LoginService(user, userAgent)

        res.setHeader('Authorization', accessToken)
        res.cookie('refresh_token', refreshToken, getCookieOptions())

        res.status(OK).json({ message: 'Login successfully' })
    })

    static readonly register: RequestHandler = CatchErrors(async (req, res) => {
        const validatedData = await validateUser(req.body) as User
        const userAgent = req.headers['user-agent'] as string

        const { publicUser, accessToken, refreshToken } = await RegisterService(validatedData, userAgent)

        res.setHeader('Authorization', accessToken)
        res.cookie('refresh_token', refreshToken, getCookieOptions())
        req.user = publicUser
        res.status(OK).json({ message: 'Register successfully' })
    })

    static readonly logout: RequestHandler = CatchErrors(async (req, res) => {
        const refreshToken = req.cookies['refresh_token']
        await LogoutService(refreshToken)

        res.clearCookie('refresh_token')
        res.status(200).json({ message: 'Logout successfully' })
    })
};
