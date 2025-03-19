export const Roles = ['ADMIN', 'MANAGER', 'SUPERVISOR', 'USER'] as const

export type Roles = typeof Roles[number]

export const RolesAuthorized = ['ADMIN', 'MANAGER']
