import { UUIDTypes } from 'uuid'
import { OrderStatus } from '../constants/orderStatus'
import { ProductCart } from '../types/types'

export interface Cart {
    id?: number,
    user_id: UUIDTypes,
    products: ProductCart[]
}

export interface Order {
    id: number,
    user_id: UUIDTypes,
    products: ProductCart[]
    total: number,
    status: OrderStatus
}