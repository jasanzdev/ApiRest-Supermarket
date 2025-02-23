import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { AccessTokenPayload, RefreshTokenPayload } from '../types/payload';
import appAssert from '../utils/appAssert';
import { NOT_FOUND, UNPROCESSABLE_CONTENT } from '../constants/http';

export const accessSecretKey = process.env.JWT_ACCESS_SECRET_KEY
    ?? crypto.randomBytes(32).toString('base64');

export const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
    ?? crypto.randomBytes(32).toString('base64');

export const generateAccessToken = (payload: AccessTokenPayload): string => {
    appAssert(payload.userId, NOT_FOUND, 'Impossible to create Access Token, user not provider')
    return jwt.sign(payload, accessSecretKey, { expiresIn: '15m' });
}

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    appAssert(payload.sessionId, NOT_FOUND, 'Impossible to create Refresh Token, user not provider')
    return jwt.sign(payload, refreshSecretKey, { expiresIn: '1d' });
}

export const verifyAccessToken = (token: string): AccessTokenPayload => {
    const { userId, sessionId } = jwt.verify(token, accessSecretKey) as AccessTokenPayload
    appAssert(sessionId && userId, UNPROCESSABLE_CONTENT, 'Invalid Access Token')
    return { userId, sessionId }
}

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    const { sessionId } = jwt.verify(token, refreshSecretKey) as RefreshTokenPayload
    appAssert(sessionId, UNPROCESSABLE_CONTENT, 'Invalid Refresh Token')
    return { sessionId }
}