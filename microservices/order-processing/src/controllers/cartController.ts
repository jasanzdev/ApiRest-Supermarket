import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import CartServices from '../services/cartServices'
import appAssert from '../utils/appAssert'
import { BAD_REQUEST, NOT_FOUND, OK } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'

export default class CartController {

    static readonly getDetails: RequestHandler = CatchErrors(async (req, res) => {
        const user = req.user

        const cart = await CartServices.getCart(user.id)

        res.status(!cart ? NOT_FOUND : OK).json(!cart
            ? { message: 'The user does not have an active cart.' }
            : cart
        )
    })

    static readonly addToCart: RequestHandler = CatchErrors(async (req, res) => {
        const input = req.body
        const user = req.user
        const receiveSecretKey = req.secret as string

        const cart = await CartServices.addToCart(input, user.id, receiveSecretKey)

        res.status(200).json(cart)
    })

    static readonly removeFromCart: RequestHandler = CatchErrors(async (req, res) => {
        const { productId, amount } = req.params
        const user = req.user

        const parseAmount = isNaN(Number(amount)) ? 1 : Number(amount)

        appAssert(
            productId,
            BAD_REQUEST,
            'Invalid Id',
            AppErrorCode.InvalidId
        )

        const cart = await CartServices.removeFromCart(productId, user.id, parseAmount)

        res.status(OK).json({
            message: 'Product removed from cart',
            cart: cart
        })
    })

    static readonly clearCart: RequestHandler = CatchErrors(async (req, res) => {
        const user = req.user
        await CartServices.clearCart(user.id)
        res.status(OK).json({ message: 'Cart cleared' })
    })
}
