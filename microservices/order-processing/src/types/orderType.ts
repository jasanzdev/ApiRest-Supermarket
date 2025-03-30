import { OrderStatus } from '../constants/orderStatus'
import { ProductCart } from './cartTypes'
import { UpdateProps, User } from './types.d'

export interface Order {
    id: string
    user_id: User['id']
    products: ProductCart[]
    total: number
    status: OrderStatus
}

export interface IOrderRepository {
    findOne(orderId: Order['id']): Promise<Order | null>
    find(userId: User['id']): Promise<Order[] | null>
    create(userId: User['id'], products: ProductCart[], total: number): Promise<Order>
    update(orderId: Order['id'], status: string): Promise<Order | null>
    findPendingOrders(userId: string): Promise<Order[] | null>
}

export interface IOrderService {
    getOrderById(id: Order['id']): Promise<Order | null>
    getOrdersDetails(user: User): Promise<Order[] | null>
    createOrder(user: User, receiveSecretKey: string): Promise<void>
    updateOrder(updateProps: UpdateProps): Promise<void>
}