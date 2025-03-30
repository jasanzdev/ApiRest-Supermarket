import { Router } from 'express'
import ValidateRequestCart from '../dto/cartBody'
import CartServices from '../services/cartServices'
import { ICartRepository, ICartService } from '../types/cartTypes'
import { CartController } from '../controllers/cartController'

export const CreateCartRouter = (cartRepository: ICartRepository) => {
    const router = Router()

    const cartService: ICartService = new CartServices(cartRepository)
    const cartController = new CartController(cartService)

    router.get('/', cartController.getDetails)
    router.post('/add', ValidateRequestCart, cartController.addToCart)
    router.delete('/remove/:amount?/:productId', cartController.removeFromCart)
    router.delete('/clear', cartController.clearCart)

    return router
}
