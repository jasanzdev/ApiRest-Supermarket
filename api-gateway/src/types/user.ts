import { Roles } from '../constants/roles'

export type User = {
    name: string,
    username: string,
    email: string,
    role: Roles,
}