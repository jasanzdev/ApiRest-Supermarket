import axios from 'axios'
import { ProductCart } from '../types/types'
import { ProductsUrl } from '../constants/urlServices'

export const calculateTotalPriceById = async (products: ProductCart[], receiveSecretKey: string) => {
    let total = 0

    for (const productCart of products) {
        const { productId, quantity } = productCart
        const response = await axios.get(`${ProductsUrl}${productId}`, {
            headers: {
                'X-API-KEY': receiveSecretKey,
            }
        })

        const { product } = response.data
        total += product.price_sale * quantity
    }

    return total
}
