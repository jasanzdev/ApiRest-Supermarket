import AppErrorCode from "../constants/appErrorCode"
import { UNAUTHORIZED } from "../constants/http"
import { SessionModel } from "../models/sessions"
import { UserModel } from "../models/users"
import { AccessTokenPayload, RefreshTokenPayload } from "../types/payload"
import { Sessions } from "../types/session"
import appAssert from "../utils/appAssert"
import jwt from 'jsonwebtoken'
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
} from "../utils/jwt"

const { TokenExpiredError } = jwt

const RefreshTokenService = async (refreshToken: string) => {
    const { sessionId } = verifyRefreshToken(refreshToken)
    const session: Sessions = await SessionModel.getById(sessionId)

    appAssert(session, UNAUTHORIZED, 'Access denied, user not found', AppErrorCode.InvalidToken)

    const refreshPayload: RefreshTokenPayload = {
        sessionId: sessionId
    }

    const accessPayload: AccessTokenPayload = {
        sessionId: session.id,
        userId: session.user_id
    }

    const newAccessToken = generateAccessToken(accessPayload)
    const newRefreshToken = generateRefreshToken(refreshPayload)

    const user = await UserModel.findById(session.user_id)
    const publicUser = UserModel.toPublish(user)

    return { publicUser, newAccessToken, newRefreshToken }
}

const ValidateTokenServices = async (accessToken: string, refreshToken: string) => {
    try {
        const { userId } = verifyAccessToken(accessToken)
        const user = await UserModel.findById(userId)
        appAssert(user, UNAUTHORIZED, 'Access denied, Invalid token', AppErrorCode.UserNotExist)
        const publicUser = UserModel.toPublish(user)
        return { publicUser }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            const { publicUser, newAccessToken, newRefreshToken } = await RefreshTokenService(refreshToken)
            return { publicUser, newAccessToken, newRefreshToken }
        } else {
            throw error
        }
    }
}

export { RefreshTokenService, ValidateTokenServices }