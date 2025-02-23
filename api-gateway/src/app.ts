import app from '../server'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { json } from 'express'
import { ProductProxy } from './proxies/productsProxy'
import { AuthProxy } from './proxies/authProxy'

app.use(cors())
app.disable('x-powered-by')
app.use(cookieParser())
app.use(helmet())

app.use('/auth', AuthProxy)
app.use('/products', ProductProxy)

app.use(json())


