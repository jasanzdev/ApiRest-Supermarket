import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from '../constants/http'
import appAssert from '../utils/appAssert'
import AppErrorCode from '../constants/appErrorCode'
import { OrderStatus } from '../constants/orderStatus'
import { IOrderService } from '../types/orderType'

export class OrderController {

    constructor(private readonly orderService: IOrderService) { }

    getOrderById: RequestHandler = CatchErrors(async (req, res) => {
        const { id } = req.params

        appAssert(
            id && !isNaN(+id),
            BAD_REQUEST,
            'User ID is either missing or not a valid number.',
            AppErrorCode.InvalidId
        )

        const order = await this.orderService.getOrderById(+id)
        res.status(order ? OK : NOT_FOUND).json({
            success: true,
            orders: order
        })
    })

    getOrdersDetails: RequestHandler = CatchErrors(async (req, res) => {
        const orders = await this.orderService.getOrdersDetails(req.user)
        res.status(orders ? OK : NOT_FOUND).json({
            success: true,
            orders: orders
        })
    })

    create: RequestHandler = CatchErrors(async (req, res) => {
        const receiveSecretKey = req.secret as string
        await this.orderService.createOrder(req.user, receiveSecretKey)
        res.status(201).json({ message: 'Your new order has been created and is now pending payment completion.' })
    })

    update: RequestHandler = CatchErrors(async (req, res) => {
        const { id } = req.params
        const { status } = req.body
        const receiveSecretKey = req.secret as string

        appAssert(
            id && !isNaN(+id),
            BAD_REQUEST,
            'User ID is either missing or not a valid number.',
            AppErrorCode.InvalidId)

        appAssert(
            status !== 'pending',
            CONFLICT,
            'Order status cannot be updated to pending',
            AppErrorCode.OrderStatusConflict
        )

        appAssert(
            OrderStatus.includes(status),
            BAD_REQUEST,
            'Invalid order status. The provided status is not recognized.',
            AppErrorCode.InvalidOrderStatus
        )

        await this.orderService.updateOrder({
            orderId: + id,
            status,
            receiveSecretKey,
            user: req.user
        })

        res.status(201).json({ message: 'Order changing status successfully' })
    })
}
