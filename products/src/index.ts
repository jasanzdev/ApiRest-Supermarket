import express, { json } from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import { CreateProductsRouter } from './routes/products';
import HandleError from './middlewares/handleErrors';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { startServer } from './config/initPostgres';

const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

const app = express()

app.use(json())
app.use(cors())
app.disable('x-powered-by')
app.use(CookieParser())

const port = process.env.PRODUCTS_PORT ?? 4001

app.use(CreateProductsRouter())

app.use(HandleError)

startServer()
    .then(() => {
        app.listen(port, () => {
            console.log(`Service Products running on http://localhost:${port}`)
        })
    }).catch(error => console.log('Error initializing server:', error))
