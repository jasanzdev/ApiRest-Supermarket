import express, { json } from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import { CreateProductsRouter } from './routes/products';
import HandleError from './middlewares/handleErrors';
import * as path from 'path';
import * as dotenv from 'dotenv';

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})