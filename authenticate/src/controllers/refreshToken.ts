import { Request, Response } from "express"
import { generateAccessToken, verifyRefreshToken } from "../config/jwt"
import { SessionModel } from "../models/sessions"
import { UserModel } from "../models/users"
import { Sessions } from "../types/session"
import { OK, UNAUTHORIZED } from "../constants/http"
import { getAccessTokenCookieOptions } from "../utils/cookieOptions"

export const RefreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        res.status(UNAUTHORIZED).json({
            message: 'Not token provider',
            user: null
        })
        return
    }

    const { sessionId } = verifyRefreshToken(refreshToken)
    const session: Sessions = await SessionModel.getById(sessionId)

    if (!session) {
        res.status(UNAUTHORIZED).json({
            message: 'Access denied',
            user: null
        })
        return
    }

    const accessPayload = {
        sessionId: session.id,
        userId: session.user_id
    }

    const newAccessToken = generateAccessToken(accessPayload)
    const user = await UserModel.findById(session.user_id)
    const publicUser = UserModel.toPublish(user)

    res.cookie('access_token', newAccessToken, getAccessTokenCookieOptions())
    res.status(OK).json({ user: publicUser })
}
