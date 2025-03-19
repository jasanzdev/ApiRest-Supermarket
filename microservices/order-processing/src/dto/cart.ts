import { UUIDTypes } from 'uuid'

export interface Cart {
    id: number,
    user_id: UUIDTypes,
    products: {
        productId: UUIDTypes,
        quantity: number
    }
}