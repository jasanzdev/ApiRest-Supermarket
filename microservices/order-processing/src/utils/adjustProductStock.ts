import axios from 'axios'
import { ProductCart, User } from '../types/types'
import { ProductsUrl } from '../constants/urlServices'
<<<<<<< HEAD
import redisClient from './redisClient'

export const AdjustProductStock = async (products: ProductCart[], receiveSecretKey: string, user: User) => {
    await redisClient.del('products/')
=======

export const AdjustProductStock = async (products: ProductCart[], receiveSecretKey: string, user: User) => {
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd
    for (const product of products) {
        const { productId, quantity } = product
        await axios.patch(`${ProductsUrl}adjust-inventory/${productId}`, {
            type: 'SALE',
            quantity: quantity,
            reason: `Sale of ${quantity} products with ID: ${productId} for a user ${user.username}`
        }, {
            headers: {
                'X-API-KEY': receiveSecretKey,
                'X-USER': JSON.stringify(user)
            }
        })
<<<<<<< HEAD
        await redisClient.del(`products/${productId}`)
=======
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd
    }
}
