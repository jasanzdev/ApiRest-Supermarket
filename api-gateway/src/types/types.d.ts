import { Roles } from '../constants/roles'

export type ResponseData = {
    message: string,
    errorCode: string
}

export type User = {
    id?: string,
    name: string,
    username: string,
    email: string,
    role: Roles,
}