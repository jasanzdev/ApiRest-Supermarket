import jwt from "jsonwebtoken";
import { UNPROCESSABLE_CONTENT } from "../constants/http";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/payload";
import { accessSecretKey, refreshSecretKey } from "../config/jwt";
import appAssert from "./appAssert";

export const generateAccessToken = (payload: AccessTokenPayload): string => {
    appAssert(
        payload.userId,
        UNPROCESSABLE_CONTENT,
        'Impossible to create Access Token, user not provider'
    )
    return jwt.sign(payload, accessSecretKey, { expiresIn: '15m' });
}

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    appAssert(
        payload.sessionId,
        UNPROCESSABLE_CONTENT,
        'Impossible to create Refresh Token, user not provider')

    return jwt.sign(payload, refreshSecretKey, { expiresIn: '1d' });
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
    const { sessionId } = jwt.verify(token, refreshSecretKey) as RefreshTokenPayload
    appAssert(sessionId, UNPROCESSABLE_CONTENT, 'Invalid Refresh Token')
    return { sessionId }
}