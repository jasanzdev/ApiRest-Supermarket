import app from './server'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { json } from 'express'
import { ProductProxy } from './proxies/productsProxy'
import { AuthProxy } from './proxies/authProxy'
import { VerifyToken } from './middleware/authenticate'
import { ErrorHandler } from './middleware/ErrorHandler'

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.send('Hello! Docker is running')
})
app.use('/auth', AuthProxy)
app.use('/products', VerifyToken, ProductProxy)

app.use(ErrorHandler)

app.use(json())
