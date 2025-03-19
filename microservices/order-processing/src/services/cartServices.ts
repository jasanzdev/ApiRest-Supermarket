import CartModel from '../models/cart'
import { Cart } from '../dto/dto'
import { ProductCart, User } from '../types/types'
import { InventoryCheck } from '../utils/inventoryCheck'
import appAssert from '../utils/appAssert'
import { NOT_FOUND } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'

export default class CartServices {
    static readonly getCart = async (userId: User['id']): Promise<Cart> => {
        const cart = await CartModel.getCart(userId)
        return cart
    }

    static readonly addToCart = async (input: ProductCart[], userId: User['id'], receiveSecretKey: string): Promise<Cart> => {
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

        const cart: Cart = await CartModel.addToCart(products, userId)
        return cart
    }

    static readonly removeFromCart = async (productId: string, userId: User['id'], amount: number) => {
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

        const updatedCart = await CartModel.updateCart(products)
        return updatedCart
    }

    static readonly clearCart = async (userId: User['id']) => {
        const cart = await this.existsCart(userId)

        appAssert(
            cart,
            NOT_FOUND,
            'Cart not found for current user',
            AppErrorCode.CartNotExist
        )

        const updatedCart = await CartModel.updateCart([])
        return updatedCart
    }

    static readonly existsCart = async (userId: User['id']): Promise<Cart | null> => {
        return await CartModel.getCart(userId)
    }
}
