import { User } from '../dto/user'

export const SuperAdmin: User = {
    name: 'System Admin',
    username: 'admin',
    password: process.env.PASS_ADMIN ?? 'Admin123',
    email: 'supermarket_admin@gmail.com',
    role: 'ADMIN'
}