import { User } from "./user";

export type Sessions = {
    user_id: User['id'],
    userAgent: string,
    expiredAt: Date
}