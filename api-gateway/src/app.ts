import app from './server'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import responseTime from 'response-time'
import SwaggerUI from 'swagger-ui-express'
import swaggerDocument from './docs/openapi3_0.json'
import { json } from 'express'
import { ProductProxy } from './proxies/productsProxy'
import { AuthProxy } from './proxies/authProxy'
import { VerifyToken } from './middleware/verifyToken'
import { NotFound } from './middleware/notFound'
import { ErrorHandler } from './middleware/errorHandler'
import { UsersProxy } from './proxies/usersProxy'
import { CheckPenalty, RateLimiter } from './middleware/rateLimiter'
import { CreateApiKey } from './middleware/createApiKey'
import { CheckCache } from './middleware/checkCache'
import { PurchaseProxy } from './proxies/purchaseProxy'

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.disable('x-powered-by')
app.use(responseTime())

app.use(CreateApiKey)
app.use(VerifyToken)
app.use(CheckPenalty)
app.use(RateLimiter)

app.use('/supermarket/auth', AuthProxy)
app.use('/supermarket/users', CheckCache, UsersProxy)
app.use('/supermarket/products', CheckCache, ProductProxy)
app.use('/supermarket/purchase', PurchaseProxy)
app.use('/supermarket/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument))

app.use(NotFound)
app.use(ErrorHandler)

app.use(json())
