import app from './server'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import responseTime from 'response-time'
import { json } from 'express'
import { ProductProxy } from './proxies/productsProxy'
import { AuthProxy } from './proxies/authProxy'
import { VerifyToken } from './middleware/verifyToken'
import { NotFound } from './middleware/notFound'
import { HomeController } from './controllers/home'
import { ErrorHandler } from './middleware/errorHandler'
import { UsersProxy } from './proxies/usersProxy'
import { CheckPenalty, RateLimiter } from './middleware/rateLimiter'
import { CreateApiKey } from './middleware/createApiKey'
import { CheckCache } from './middleware/checkCache'
import { PurchaseProxy } from './proxies/purchaseProxy'
<<<<<<< HEAD
import config from './config/config'
=======
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd

app.use(cors({
    origin: config.allowedOrigins.origins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(helmet())
app.use(cookieParser())
app.disable('x-powered-by')

app.use(responseTime())
app.get('/', HomeController)
app.use(CreateApiKey)
app.use(VerifyToken)
app.use(CheckPenalty)
app.use(RateLimiter)
app.use('/auth', AuthProxy)
app.use('/users', CheckCache, UsersProxy)
app.use('/products', CheckCache, ProductProxy)
app.use('/purchase', PurchaseProxy)
app.use(NotFound)
app.use(ErrorHandler)

app.use(json())
