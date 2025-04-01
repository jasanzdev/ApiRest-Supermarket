import { envs } from '../config/config'
import { User } from '../types/types.d'

export const SuperAdmin: User = {
    name: 'System Admin',
    username: 'admin',
    password: envs.adminPass,
    email: 'supermarket_admin@gmail.com',
    role: 'ADMIN'
}