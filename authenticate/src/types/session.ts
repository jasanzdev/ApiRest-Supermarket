import { User } from "./publicUser";

export type Sessions = {
    id: number,
    user_id: User['id'],
    userAgent: string,
}