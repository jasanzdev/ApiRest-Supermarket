import { Request, Response } from "express"
import { generateAccessToken, verifyRefreshToken } from "../config/jwt"
import { SessionModel } from "../models/sessions"
import { UserModel } from "../models/users"
import { Sessions } from "../types/session"
import { OK } from "../constants/http"
import { getAccessTokenCookieOptions } from "../utils/cookieOptions"

export const RefreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token
    const userAgent = req.headers['user-agent'] as string

    if (!refreshToken) {
        res.status(OK).json({ user: null })
        return
    }

    const { sessionId } = verifyRefreshToken(refreshToken)
    const session: Sessions = await SessionModel.getBy(sessionId, userAgent)

    if (!session) {
        res.status(OK).json({ user: null })
        return
    }

    const accessPayload = {
        userId: session.user_id,
        sessionId: session.user_id
    }

    const newAccessToken = generateAccessToken(accessPayload)
    const user = await UserModel.findById(session.user_id)
    const publicUser = UserModel.toPublish(user)

    res.cookie('access_token', newAccessToken, getAccessTokenCookieOptions())
    res.status(OK).json({ user: publicUser })
}
