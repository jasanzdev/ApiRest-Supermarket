import { OrderStatus } from '../constants/orderStatus'

export type User = {
    id: string,
    name: string,
    username: string,
    email: string
    role: string
}

export interface UpdateProps {
    orderId: Order['id']
    user: User
    status: OrderStatus
    receiveSecretKey: string
}

export interface ErrorResponseData {
    statusCode: number,
    message: string,
    errorCode?: string
}