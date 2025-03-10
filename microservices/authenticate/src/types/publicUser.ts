import { UUIDTypes } from 'uuid'
import { Roles } from '../constants/roles'

export type PublicUser = {
    id?: UUIDTypes,
    name: string,
    username: string,
    email: string,
    role: Roles,
}
