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

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.disable('x-powered-by')

app.get('/', HomeController)
app.use('/auth', AuthProxy)
app.use('/users', VerifyToken, UsersProxy)
app.use('/products', VerifyToken, ProductProxy)
app.use(NotFound)
app.use(ErrorHandler)

app.use(json())
