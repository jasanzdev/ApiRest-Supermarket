export const Roles = ['ADMIN', 'SUPERVISOR', 'OPERATOR'] as const

export type Roles = typeof Roles[number]