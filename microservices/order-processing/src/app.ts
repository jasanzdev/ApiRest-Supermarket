import { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from './config/config'

import app from './server'
import { CreateCartRouter } from './routes/cartRoutes'
import { CreateOrdersRouter } from './routes/ordersRoutes'
import { ErrorHandler } from './middlewares/errorHandler'
import { ValidateApiAccess } from './middlewares/validateApiAccess'

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || config.allowedOrigins.origins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
    })
)
app.use(json())
app.use(cookieParser())
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json({ message: 'Hello Shopping Cart Service' })
})
app.use(ValidateApiAccess)
app.use('/cart', CreateCartRouter())
app.use('/orders', CreateOrdersRouter())

app.use(ErrorHandler)


