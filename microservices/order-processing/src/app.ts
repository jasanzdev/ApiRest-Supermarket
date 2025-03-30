import { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './config/mongodb'
import app from './server'
import { CreateCartRouter } from './routes/cartRoutes'
import { CreateOrdersRouter } from './routes/ordersRoutes'
import { ErrorHandler } from './middlewares/errorHandler'
import { ValidateApiAccess } from './middlewares/validateApiAccess'
import { ICartRepository } from './types/cartTypes'
import { IOrderRepository } from './types/orderType'
import { CartRepository } from './repositories/cart'
import { OrderRepository } from './repositories/order'

app.use(cors())
app.use(json())
app.use(cookieParser())
app.disable('x-powered-by')

app.use(ValidateApiAccess)

const cartRepository: ICartRepository = new CartRepository()
const orderRepository: IOrderRepository = new OrderRepository()

app.use('/cart', CreateCartRouter(cartRepository))
app.use('/orders', CreateOrdersRouter(orderRepository, cartRepository))

app.use(ErrorHandler)


