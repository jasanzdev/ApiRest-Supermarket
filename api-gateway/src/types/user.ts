export type User = {
    name: string,
    username: string,
    email: string,
    role: 'ADMIN' | 'SUPERVISOR' | 'OPERATOR',
}