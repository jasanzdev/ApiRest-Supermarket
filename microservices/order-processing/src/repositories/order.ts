import { OrderModel } from '../models/order'
import { ProductCart } from '../types/cartTypes'
import { IOrderRepository, Order } from '../types/orderType'
import { User } from '../types/types'

export class OrderRepository implements IOrderRepository {
    async findOne(orderId: Order['id']): Promise<Order | null> {
        return await OrderModel.findById(orderId).exec()
    }

    async find(userId: User['id']): Promise<Order[] | null> {
        return await OrderModel.find({ user_id: userId }).exec()
    }

    async create(userId: User['id'], products: ProductCart[], total: number): Promise<Order> {
        const newOrder = new OrderModel({
            user_id: userId,
            products: products,
            total: total
        })

        return await newOrder.save()
    }

    async update(orderId: Order['id'], status: string): Promise<Order | null> {
        return await OrderModel.findByIdAndUpdate(
            orderId,
            { $set: { status: status } },
            { new: true })
            .exec()
    }

    async findPendingOrders(userId: string): Promise<Order[] | null> {
        return OrderModel.find({ user_id: userId, status: 'Pending' }).exec()
    }
}
