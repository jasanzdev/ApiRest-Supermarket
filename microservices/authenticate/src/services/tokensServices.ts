import appAssert from '../utils/appAssert'
import jwt from 'jsonwebtoken'
import AppErrorCode from '../constants/appErrorCode'
import { UNAUTHORIZED } from '../constants/http'
import { SessionModel } from '../models/sessions'
import { toPublishUser } from '../utils/userToPublish'
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
} from '../utils/jwt'
import {
    AccessTokenPayload,
    RefreshTokenPayload,
    Sessions
} from '../types/types.d'
import { User } from '../dto/user'
import { FetchUserById } from '../utils/fetchUserAxios'
import redisClient from '../config/redisClient'

const { TokenExpiredError } = jwt

/**
 * Service function to refresh tokens when the access token expires.
 * @param {string} refreshToken - The refresh token to validate and refresh.
 * @param {string} receiveSecretKey - The secret API key from the request.
 * @returns {Promise<{ publicUser: PublicUser, newAccessToken: string, newRefreshToken: string }>} New tokens and user data.
 */
const RefreshTokenService = async (refreshToken: string, receiveSecretKey: string) => {
    const isTokenInvalidated = await redisClient.get(refreshToken)

    appAssert(!isTokenInvalidated,
        UNAUTHORIZED,
        'Token has been invalidated',
        AppErrorCode.InvalidToken
    )

    const refreshTokenSplitter = refreshToken.split('=')[1]

    const { sessionId, exp } = verifyRefreshToken(
        !refreshTokenSplitter
            ? refreshToken
            : refreshTokenSplitter)

    const session: Sessions = await SessionModel.getById(sessionId)

    appAssert(session, UNAUTHORIZED, 'Access denied, user not found', AppErrorCode.InvalidToken)

    const refreshPayload: RefreshTokenPayload = {
        sessionId: sessionId
    }

    const accessPayload: AccessTokenPayload = {
        sessionId: session.id,
        userId: session.user_id
    }
    const currentTime = Math.floor(Date.now() / 1000)
    const ttl = exp as number - currentTime

    redisClient.set(refreshToken, 'invalidated', { EX: ttl })

    const newAccessToken = generateAccessToken(accessPayload)
    const newRefreshToken = generateRefreshToken(refreshPayload)

    const user: User = await FetchUserById(session.user_id, receiveSecretKey)

    const publicUser = toPublishUser(user)
    return { publicUser, newAccessToken, newRefreshToken }
}

/**
 * Service function to validate tokens and refresh them if necessary.
 * @param {string} accessToken - The access token from the request header.
 * @param {string} refreshToken - The refresh token from the request cookie.
 * @param {string} receiveSecretKey - The secret API key from the request.
 * @returns {Promise<{ publicUser: PublicUser, newAccessToken?: string, newRefreshToken?: string }>} User data and optional new tokens.
 */
const ValidateTokenServices = async (accessToken: string, refreshToken: string, receiveSecretKey: string) => {
    try {
        const { userId } = verifyAccessToken(accessToken)

        const user: User = await FetchUserById(userId, receiveSecretKey)

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