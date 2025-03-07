import AppErrorCode from '../constants/appErrorCode'
import { UNAUTHORIZED } from '../constants/http'
import { SessionModel } from '../models/sessions'
import { AccessTokenPayload, RefreshTokenPayload } from '../types/payload'
import { Sessions } from '../types/session'
import appAssert from '../utils/appAssert'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { userServiceUrl } from '../constants/axios'
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
} from '../utils/jwt'
import { toPublishUser } from '../utils/userToPublish'

const { TokenExpiredError } = jwt

const RefreshTokenService = async (refreshToken: string, receiveSecretKey: string) => {
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

    const response = await axios.get(`${userServiceUrl}${session.user_id}`, {
        headers: {
            'API_KEY': receiveSecretKey,
        }
    })

    const { user } = response.data
    const publicUser = toPublishUser(user)

    return { publicUser, newAccessToken, newRefreshToken }
}

const ValidateTokenServices = async (accessToken: string, refreshToken: string, receiveSecretKey: string) => {
    try {
        const { userId } = verifyAccessToken(accessToken)
        const response = await axios.get(`${userServiceUrl}${userId}`, {
            headers: {
                'API_KEY': receiveSecretKey,
            }
        })

        const { user } = response.data

        appAssert(user, UNAUTHORIZED, 'Access denied, Invalid token', AppErrorCode.UserNotExist)
        const publicUser = toPublishUser(user)
        return { publicUser }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            const { publicUser, newAccessToken, newRefreshToken } = await RefreshTokenService(refreshToken, receiveSecretKey)
            return { publicUser, newAccessToken, newRefreshToken }
        } else {
            throw error
        }
    }
}

export { RefreshTokenService, ValidateTokenServices }