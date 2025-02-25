export const Roles = ['ADMIN', 'SUPERVISOR', 'OPERATOR', 'USER'] as const

export type Roles = typeof Roles[number]