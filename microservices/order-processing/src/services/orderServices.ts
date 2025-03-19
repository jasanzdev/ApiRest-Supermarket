import AppErrorCode from '../constants/appErrorCode'
import { NOT_FOUND } from '../constants/http'
import { Cart, Order } from '../dto/dto'
import CartModel from '../models/cart'
import OrderModel from '../models/order'
import { UpdateProps, User } from '../types/types'
import { AdjustProductStock } from '../utils/adjustProductStock'
import appAssert from '../utils/appAssert'
import { calculateTotalPriceById } from '../utils/calculateTotalPriceById'
import { InventoryCheck } from '../utils/inventoryCheck'

export default class OrderService {
    static readonly getOrderById = async (id: Order['id']): Promise<Order | null> => {
        return await OrderModel.findOne(id)
    }

    static readonly getOrdersDetails = async (user: User): Promise<Order[] | null> => {
        return await OrderModel.find(user.id)
    }

    static readonly createOrder = async (user: User, receiveSecretKey: string): Promise<void> => {
        const cart: Cart = await CartModel.getCart(user.id)
        const products = cart?.products

        appAssert(
            cart || products?.length > 0,
            NOT_FOUND,
            'User does not have an active cart',
            AppErrorCode.CartNotExist
        )

        const total = await calculateTotalPriceById(products, receiveSecretKey)
        await OrderModel.create(user.id, products, total)
        await CartModel.delete(cart.id)
    }

    static readonly updateOrder = async (updateProps: UpdateProps): Promise<void> => {
        const { orderId, user, status, receiveSecretKey } = updateProps
        const order = await OrderModel.findOne(orderId)

        appAssert(
            order,
            NOT_FOUND,
            `Order with id ${orderId} does not exist`,
            AppErrorCode.OrderNotExist
        )

        if (status === 'Paid') {
            await InventoryCheck(order.products, receiveSecretKey)
            await AdjustProductStock(order.products, receiveSecretKey, user)
        }

        await OrderModel.update(orderId, status)
    }
}