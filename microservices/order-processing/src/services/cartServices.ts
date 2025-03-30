import { InventoryCheck } from '../utils/inventoryCheck'
import appAssert from '../utils/appAssert'
import { NOT_FOUND } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import { Cart, ICartRepository, ICartService, ProductCart } from '../types/cartTypes'
import { User } from '../types/types.d'

export default class CartServices implements ICartService {
    constructor(private readonly cartRepository: ICartRepository) { }

    async findOne(userId: User['id']): Promise<Cart | null> {
        return await this.cartRepository.findOne(userId)
    }

    async addToCart(input: ProductCart[], userId: User['id'], receiveSecretKey: string): Promise<Cart> {
        await InventoryCheck(input, receiveSecretKey)

        const existCart = await this.existsCart(userId)
        const products: ProductCart[] = existCart?.products ?? []

        if (existCart) {
            for (const product of input) {
                const { productId, quantity } = product
                const productIndex = existCart.products.findIndex(product => product.productId === productId)
                if (productIndex !== -1) {
                    products[productIndex].quantity += quantity
                    continue
                }
                products.push(product)
            }
        } else {
            products.push(...input)
        }

        const cart: Cart = await this.cartRepository.addToCart(products, userId)
        return cart
    }

    async removeFromCart(productId: string, userId: User['id'], amount: number): Promise<Cart | null> {
        const cart = await this.existsCart(userId)

        appAssert(
            cart?.products,
            NOT_FOUND,
            'Cart not found for current user',
            AppErrorCode.CartNotExist
        )

        const productIndex = cart.products.findIndex(product => product.productId === productId)

        appAssert(
            productIndex !== -1,
            NOT_FOUND,
            'Product not found in cart',
            AppErrorCode.ProductNotExist
        )

        const products = [...cart.products]

        if (cart.products[productIndex].quantity <= amount) {
            products.splice(productIndex, 1)
        } else {
            products[productIndex].quantity -= amount
        }

        const updatedCart = await this.cartRepository.update(products, userId)
        return updatedCart
    }

    async clearCart(userId: User['id']): Promise<Cart | null> {
        const cart = await this.existsCart(userId)

        appAssert(
            cart,
            NOT_FOUND,
            'Cart not found for current user',
            AppErrorCode.CartNotExist
        )

        const updatedCart = await this.cartRepository.update([], userId)
        return updatedCart
    }

    async existsCart(userId: User['id']): Promise<Cart | null> {
        return await this.cartRepository.findOne(userId)
    }
}
