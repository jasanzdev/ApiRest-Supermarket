import { Router } from 'express'
import OrdersController from '../controllers/orderController'

export const CreateOrdersRouter = () => {
    const router = Router()

    router.get('/', OrdersController.getOrdersDetails)
    router.get('/:id', OrdersController.getOrderById)
    router.post('/', OrdersController.create)
    router.patch('/:id', OrdersController.update)

    return router
}
