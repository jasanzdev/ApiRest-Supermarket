import { Roles } from '../constants/roles'

export interface User {
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
    role: Roles,
}

export type PublicUser = Omit<User, 'password'>

export type Sessions = {
    id: number,
    userId: PublicUser['id'],
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