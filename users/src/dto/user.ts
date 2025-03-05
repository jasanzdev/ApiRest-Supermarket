import { UUIDTypes } from 'uuid'

export interface User {
    id?: UUIDTypes,
    name: string,
    username: string,
    password: string,
    email: string,
    role?: string
}

export interface UserToUpdate {
    name?: string,
    password?: string,
    email?: string,
    role?: string
}