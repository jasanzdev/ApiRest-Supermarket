export const OrderStatus = ['Pending', 'Paid', 'Shipped', 'Cancelled'] as const

export type OrderStatus = typeof OrderStatus[number]