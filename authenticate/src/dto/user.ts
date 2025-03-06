import { UUIDTypes } from 'uuid'
import { Roles } from '../constants/roles'

export interface User {
    id?: UUIDTypes,
    name: string,
    username: string,
    email: string,
    password: string,
    role: Roles,
}