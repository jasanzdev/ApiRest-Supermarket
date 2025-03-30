import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import appAssert from '../utils/appAssert'
import { BAD_REQUEST, NOT_FOUND, OK } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import { ICartService } from '../types/cartTypes'
export class CartController {

    constructor(private readonly cartService: ICartService) { }

    getDetails: RequestHandler = CatchErrors(async (req, res) => {
        const user = req.user

        const cart = await this.cartService.findOne(user.id)

        res.status(!cart ? NOT_FOUND : OK).json(!cart
            ? { message: 'The user does not have an active cart.' }
            : cart
        )
    })

    addToCart: RequestHandler = CatchErrors(async (req, res) => {
        const input = req.body
        const user = req.user
        const receiveSecretKey = req.secret as string

        const cart = await this.cartService.addToCart(input, user.id, receiveSecretKey)

        res.status(200).json(cart)
    })

    removeFromCart: RequestHandler = CatchErrors(async (req, res) => {
        const { productId, amount } = req.params
        const user = req.user

        const parseAmount = isNaN(Number(amount)) ? 1 : Number(amount)

        appAssert(
            productId,
            BAD_REQUEST,
            'Invalid Id',
            AppErrorCode.InvalidId
        )

        const cart = await this.cartService.removeFromCart(productId, user.id, parseAmount)

        res.status(OK).json({
            message: 'Product removed from cart',
            cart: cart
        })
    })

    clearCart: RequestHandler = CatchErrors(async (req, res) => {
        const user = req.user
        await this.cartService.clearCart(user.id)
        res.status(OK).json({ message: 'Cart cleared' })
    })
}
