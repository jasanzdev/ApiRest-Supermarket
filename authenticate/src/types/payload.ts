import { Sessions } from "./session";
import { User } from "./publicUser";

export type AccessTokenPayload = {
    userId: User['id'],
    sessionId: number
}

export type RefreshTokenPayload = {
    sessionId: Sessions['id']
}