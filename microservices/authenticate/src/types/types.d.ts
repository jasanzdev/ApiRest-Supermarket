<<<<<<< HEAD
import { User } from '../dto/user'

export type PublicUser = Omit<User, 'password'>
=======
import { UUIDTypes } from 'uuid'
import { Roles } from '../constants/roles'

export type PublicUser = {
    id?: UUIDTypes,
    name: string,
    username: string,
    email: string,
    role: Roles,
}
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd

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