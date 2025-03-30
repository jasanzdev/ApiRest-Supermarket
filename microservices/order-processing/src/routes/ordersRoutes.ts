import { Router } from 'express'
import { IOrderRepository, IOrderService } from '../types/orderType'
import { OrderService } from '../services/orderServices'
import { ICartRepository } from '../types/cartTypes'
import { OrderController } from '../controllers/orderController'

export const CreateOrdersRouter = (
    orderRepository: IOrderRepository,
    cartRepository: ICartRepository) => {

    const router = Router()
    const orderService: IOrderService = new OrderService(orderRepository, cartRepository)
    const orderController = new OrderController(orderService)

    router.get('/', orderController.getOrdersDetails)
    router.get('/:id', orderController.getOrderById)
    router.post('/', orderController.create)
    router.patch('/:id', orderController.update)

    return router
}
