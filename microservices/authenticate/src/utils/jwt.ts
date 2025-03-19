import jwt from 'jsonwebtoken'
import { UNPROCESSABLE_CONTENT } from '../constants/http'
<<<<<<< HEAD
import appAssert from './appAssert'
import { AccessTokenPayload, RefreshTokenPayload } from '../types/types.d'
import config from '../config/config'

const accessSecretKey = config.jwt.accessSecretKey
const refreshSecretKey = config.jwt.refreshSecretKey
=======
import { accessSecretKey, refreshSecretKey } from '../config/jwt'
import appAssert from './appAssert'
import { AccessTokenPayload, RefreshTokenPayload } from '../types/types.d'
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd

export const generateAccessToken = (payload: AccessTokenPayload): string => {
    appAssert(
        payload.userId,
        UNPROCESSABLE_CONTENT,
        'Impossible to create Access Token, user not provider'
    )
    return jwt.sign(payload, accessSecretKey, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    appAssert(
        payload.sessionId,
        UNPROCESSABLE_CONTENT,
        'Impossible to create Refresh Token, user not provider')

    return jwt.sign(payload, refreshSecretKey, { expiresIn: '1d' })
}

export const verifyAccessToken = (token: string): AccessTokenPayload => {
    const { userId, sessionId } = jwt.verify(token, accessSecretKey) as AccessTokenPayload

    appAssert(
        sessionId && userId,
        UNPROCESSABLE_CONTENT,
        'Invalid Access Token')

    return { userId, sessionId }
}

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    const { sessionId, exp } = jwt.verify(token, refreshSecretKey) as RefreshTokenPayload
    appAssert(sessionId, UNPROCESSABLE_CONTENT, 'Invalid Refresh Token')
    return { sessionId, exp }
}