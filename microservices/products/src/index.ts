import * as path from 'path'
import * as dotenv from 'dotenv'
const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

import express, { json } from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import { CreateProductsRouter } from './routes/products'
import HandleError from './middlewares/handleErrors'
import { startServer } from './config/initPostgres'
import { VerifySecretKey } from './middlewares/verifySecretKey'


const app = express()

const allowedOrigins = [process.env.ALLOWED_ORIGIN, 'http://localhost:3000', 'http://localhost:4000']

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
    })
)
app.use(json())
app.disable('x-powered-by')
app.use(CookieParser())

const port = process.env.PRODUCTS_PORT ?? 4001

app.use(VerifySecretKey)
app.use(CreateProductsRouter())

app.use(HandleError)

startServer()
    .then(() => {
        app.listen(port, () => {
            console.log(`Service Products running on http://localhost:${port}`)
        })
    }).catch(error => console.log('Error initializing server:', error))
