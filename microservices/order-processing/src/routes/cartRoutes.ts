import { Router } from 'express'
import CartController from '../controllers/cartController'
import ValidateRequestCart from '../schema/cartBody'

export const CreateCartRouter = () => {
    const router = Router()

    router.get('/', CartController.getDetails)
    router.post('/add', ValidateRequestCart, CartController.addToCart)
    router.delete('/remove/:amount?/:productId', CartController.removeFromCart)
    router.delete('/clear', CartController.clearCart)

    return router
}
