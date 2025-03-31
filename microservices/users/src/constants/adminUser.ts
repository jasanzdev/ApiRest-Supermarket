import { envs } from '../config/config'
import { User } from '../dto/user'

export const SuperAdmin: User = {
    name: 'System Admin',
    username: 'admin',
    password: envs.adminPass,
    email: 'supermarket_admin@gmail.com',
    role: 'ADMIN'
}