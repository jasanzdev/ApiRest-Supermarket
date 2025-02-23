import { UUIDTypes } from "uuid";
import { Roles } from "../constants/roles";

export type User = {
    id?: UUIDTypes,
    name: string,
    username: string,
    email: string,
    password: string,
    role: Roles,
}

export type PublishUser = Pick<User, 'id' | 'name' | 'username' | 'email' | 'role'>
