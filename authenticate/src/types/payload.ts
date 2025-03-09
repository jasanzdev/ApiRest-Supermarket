import { PublicUser } from './publicUser'
import { Sessions } from './session'

export type AccessTokenPayload = {
    userId: PublicUser['id'],
    sessionId: number
}

export type RefreshTokenPayload = {
    sessionId: Sessions['id']
}