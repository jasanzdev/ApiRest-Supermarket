import { User } from "./user";

export type Sessions = {
    id: number,
    user_id: User['id'],
    userAgent: string,
}