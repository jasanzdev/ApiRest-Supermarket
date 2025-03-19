import { User } from '../dto/user'

export type PublicUser = Omit<User, 'password'>

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