import { Request, Response } from "express"
import { OK, UNAUTHORIZED } from "../constants/http"
import { getCookieOptions } from "../utils/cookieOptions"
import appAssert from "../utils/appAssert"
import { RefreshTokenService } from "../services/verifyTokens"
import AppErrorCode from "../constants/appErrorCode"
import CatchErrors from "../utils/catchErrors"

export const RefreshToken = CatchErrors(async (req: Request, res: Response) => {
    const refreshToken = req.cookies['refresh_token']

    appAssert(
        refreshToken,
        UNAUTHORIZED,
        'Access denied, Not token provider',
        AppErrorCode.NoTokenProvider
    )

    const { publicUser, newAccessToken, newRefreshToken } = await RefreshTokenService(refreshToken)

    res.setHeader('Authorization', newAccessToken)
    res.cookie('refresh_token', newRefreshToken, getCookieOptions())

    res.status(OK).json({ user: publicUser })
})
