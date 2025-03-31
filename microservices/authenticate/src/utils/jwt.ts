import jwt from 'jsonwebtoken'
import { UNPROCESSABLE_CONTENT } from '../constants/http'
import appAssert from './appAssert'
import { AccessTokenPayload, RefreshTokenPayload } from '../types/types.d'
import { envs } from '../config/config'

const accessSecretKey = envs.accessSecretKey
const refreshSecretKey = envs.refreshSecretKey

export const generateAccessToken = (payload: AccessTokenPayload): string => {
    return jwt.sign(payload, accessSecretKey, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    return jwt.sign(payload, refreshSecretKey, { expiresIn: '1d' })
}

/**
 * Function to verify and decode an access token.
 * @param {string} token - The access token to verify.
 * @returns {AccessTokenPayload} The decoded payload containing userId and sessionId.
 */
export const verifyAccessToken = (token: string): AccessTokenPayload => {
    const { userId, sessionId } = jwt.verify(token, accessSecretKey) as AccessTokenPayload

    appAssert(
        sessionId && userId,
        UNPROCESSABLE_CONTENT,
        'Invalid Access Token')

    return { userId, sessionId }
}

/**
 * Function to verify and decode a refresh token.
 * @param {string} token - The refresh token to verify.
 * @returns {RefreshTokenPayload} The decoded payload containing sessionId and expiration.
 */
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    const { sessionId, exp } = jwt.verify(token, refreshSecretKey) as RefreshTokenPayload
    appAssert(sessionId, UNPROCESSABLE_CONTENT, 'Invalid Refresh Token')
    return { sessionId, exp }
}