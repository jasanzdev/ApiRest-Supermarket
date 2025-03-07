import app from './server'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
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

app.use(cors({
    origin: [process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(helmet())
app.use(cookieParser())
app.disable('x-powered-by')

app.get('/', HomeController)
app.use(CreateApiKey)
app.use(VerifyToken)
app.use(CheckPenalty)
app.use(RateLimiter)
app.use('/auth', AuthProxy)
app.use('/users', UsersProxy)
app.use('/products', ProductProxy)
app.use(NotFound)
app.use(ErrorHandler)

app.use(json())
