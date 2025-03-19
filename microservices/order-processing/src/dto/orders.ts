import { OrderStatus } from '../constants/orderStatus'

export interface Orders {
    id: number,
    cart_id: number,
    total: number,
    status: OrderStatus
}