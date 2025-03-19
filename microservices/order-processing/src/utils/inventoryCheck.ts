import axios from 'axios'
import { ProductsUrl } from '../constants/urlServices'
import { ProductCart } from '../types/types'
import { BAD_REQUEST, NOT_FOUND } from '../constants/http'
import appAssert from './appAssert'
import AppErrorCode from '../constants/appErrorCode'

export const InventoryCheck = async (products: ProductCart[], receiveSecretKey: string) => {
    for (const product of products) {
        const { productId, quantity } = product
        const { stock } = await checkExitsStock(productId, receiveSecretKey)
        appAssert(
            stock > quantity,
            BAD_REQUEST,
            `Stock available is ${stock} for product: ${productId}`,
            AppErrorCode.ProductOutOfStock
        )
    }
}

const checkExitsStock = async (productId: ProductCart['productId'], receiveSecretKey: string) => {
    const response = await axios.get(`${ProductsUrl}${productId}`, {
        headers: {
            'X-API-KEY': receiveSecretKey,
        }
    })

    const { product } = response.data

    appAssert(
        product || !product.active,
        NOT_FOUND,
        `Product with id ${productId} does not exist or is not available`,
        AppErrorCode.ProductNotExist
    )

    appAssert(
        product.stock > 0,
        NOT_FOUND,
        `Product ${product.name} out of stock`,
        AppErrorCode.ProductOutOfStock
    )

    return product
}
