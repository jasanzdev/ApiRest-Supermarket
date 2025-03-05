export const Roles = ['ADMIN', 'MANAGER', 'USER'] as const

export type Roles = typeof Roles[number]