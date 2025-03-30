import { User } from './types.d'

export interface Cart {
    id: string
    user_id: string,
    products: ProductCart[]
}

export type ProductCart = {
    productId: string,
    quantity: number
}

export interface ICartRepository {
    findOne(userId: User['id']): Promise<Cart | null>
    addToCart(products: ProductCart[], userId: User['id']): Promise<Cart>
    update(products: ProductCart[], userId: User['id']): Promise<Cart | null>
    delete(id: Cart['id']): Promise<void>
}

export interface ICartService {
    findOne(id: User['id']): Promise<Cart | null>
    addToCart(input: ProductCart[], userId: User['id'], receiveSecretKey: string): Promise<Cart>
    removeFromCart(productId: string, userId: User['id'], amount: number): Promise<Cart | null>
    clearCart(userId: User['id']): Promise<Cart | null>
    existsCart(userId: User['id']): Promise<Cart | null>
}