export const OrderStatus = ['Pending', 'Paid', 'Shipped'] as const

export type OrderStatus = typeof OrderStatus[number]