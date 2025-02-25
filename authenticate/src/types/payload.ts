import { Sessions } from "./session";
import { User } from "./user";

export type AccessTokenPayload = {
    userId: User['id'],
    sessionId: number
}

export type RefreshTokenPayload = {
    sessionId: Sessions['id']
}