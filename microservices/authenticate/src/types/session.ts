import { PublicUser } from './publicUser'

export type Sessions = {
    id: number,
    user_id: PublicUser['id'],
    userAgent: string,
}