import { UUIDTypes } from "uuid"

export interface User {
    id?: UUIDTypes,
    name: string,
    username: string,
    email: string,
    role?: string
}