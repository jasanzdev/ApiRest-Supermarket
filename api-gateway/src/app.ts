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

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.disable('x-powered-by')

app.get('/', HomeController)
app.use(VerifyToken)
app.use(CheckPenalty)
app.use(RateLimiter)
app.use('/auth', AuthProxy)
app.use('/users', UsersProxy)
app.use('/products', ProductProxy)
app.use(NotFound)
app.use(ErrorHandler)

app.use(json())
