import { Request, Response } from 'express'
import CatchErrors from '../utils/catchErrors'
import appAssert from '../utils/appAssert'
import { OK, UNAUTHORIZED } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import { ValidateTokenServices } from '../services/verifyTokens'
import { getCookieOptions } from '../utils/cookieOptions'

export const ValidateToken = CatchErrors(async (req: Request, res: Response) => {
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies['refresh_token']

    appAssert(accessToken,
        UNAUTHORIZED,
        'Access denied, No token provider',
        AppErrorCode.NoTokenProvider)

    const { publicUser, newAccessToken, newRefreshToken } = await ValidateTokenServices(accessToken, refreshToken)

    if (newAccessToken && newRefreshToken) {
        res.setHeader('Authorization', newAccessToken)
        res.cookie('refresh_token', newRefreshToken, getCookieOptions())
    }

    res.status(OK).json({ user: publicUser })
})

