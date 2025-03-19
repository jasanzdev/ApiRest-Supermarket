import { UUIDTypes } from 'uuid'
import { Roles } from '../constants/roles'

export type PublicUser = {
    id?: UUIDTypes,
    name: string,
    username: string,
    email: string,
    role: Roles,
}

export type Sessions = {
    id: number,
    user_id: PublicUser['id'],
    userAgent: string,
}

export type AccessTokenPayload = {
    userId: PublicUser['id'],
    sessionId: number
}

export type RefreshTokenPayload = {
    sessionId: Sessions['id'],
    exp?: number
}