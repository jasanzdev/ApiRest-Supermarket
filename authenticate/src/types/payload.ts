import { User } from "./user";

export type AccessTokenPayload = {
    userId: User['id'],
    sessionId: User['id']
}

export type RefreshTokenPayload = {
    sessionId: User['id']
}