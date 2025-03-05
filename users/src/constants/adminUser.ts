import { User } from '../dto/user'

export const SuperAdmin: User = {
    name: 'Super Admin',
    username: 'super_admin',
    password: process.env.PASS_ADMIN ?? 'Admin123',
    email: 'supermarket_admin@gmail.com',
    role: 'SUPER_ADMIN'
}