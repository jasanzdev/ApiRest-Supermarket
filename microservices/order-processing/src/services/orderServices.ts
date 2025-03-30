import AppErrorCode from '../constants/appErrorCode'
import { NOT_FOUND } from '../constants/http'
import { ICartRepository } from '../types/cartTypes'
import { IOrderRepository, IOrderService, Order } from '../types/orderType'
import { UpdateProps, User } from '../types/types.d'
import { AdjustProductStock } from '../utils/adjustProductStock'
import appAssert from '../utils/appAssert'
import { calculateTotalPriceById } from '../utils/calculateTotalPriceById'
import { InventoryCheck } from '../utils/inventoryCheck'

export class OrderService implements IOrderService {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly cartRepository: ICartRepository
    ) { }

    async getOrderById(id: Order['id']): Promise<Order | null> {
        return await this.orderRepository.findOne(id)
    }

    async getOrdersDetails(user: User): Promise<Order[] | null> {
        return await this.orderRepository.find(user.id)
    }

    async createOrder(user: User, receiveSecretKey: string): Promise<void> {
        const cart = await this.cartRepository.findOne(user.id)
        const products = cart?.products

        appAssert(
            cart && products && products?.length > 0,
            NOT_FOUND,
            'User does not have an active cart',
            AppErrorCode.CartNotExist
        )

        const total = await calculateTotalPriceById(products, receiveSecretKey)
        await this.orderRepository.create(user.id, products, total)
        await this.cartRepository.delete(cart.id)
    }

    async updateOrder(updateProps: UpdateProps): Promise<void> {
        const { orderId, user, status, receiveSecretKey } = updateProps
        const order = await this.orderRepository.findOne(orderId)

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

        await this.orderRepository.update(orderId, status)
    }
}