import appAssert from '../utils/appAssert'
import jwt from 'jsonwebtoken'
import AppErrorCode from '../constants/appErrorCode'
import { UNAUTHORIZED } from '../constants/http'
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
    User
} from '../types/types.d'
import { FetchUserById } from '../utils/fetchUserAxios'
import redisClient from '../config/redisClient'
import { SessionRepository } from '../repositories/session'

const { TokenExpiredError } = jwt

const RefreshTokenService = async (refreshToken: string, receiveSecretKey: string) => {
    const sessionRepository = new SessionRepository()
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

    const session = await sessionRepository.findById(sessionId)

    appAssert(session, UNAUTHORIZED, 'Access denied, user not found', AppErrorCode.InvalidToken)

    const refreshPayload: RefreshTokenPayload = {
        sessionId: sessionId
    }

    const accessPayload: AccessTokenPayload = {
        sessionId: session.id,
        userId: session.userId
    }
    const currentTime = Math.floor(Date.now() / 1000)
    const ttl = exp as number - currentTime

    redisClient.set(refreshToken, 'invalidated', { EX: ttl })

    const newAccessToken = generateAccessToken(accessPayload)
    const newRefreshToken = generateRefreshToken(refreshPayload)

    const user: User = await FetchUserById(session.userId, receiveSecretKey)

    const publicUser = toPublishUser(user)
    return { publicUser, newAccessToken, newRefreshToken }
}

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