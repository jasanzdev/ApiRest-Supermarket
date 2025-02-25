import 'dotenv/config';
import express, { json } from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import { CreateProductsRouter } from './routes/products';
import HandleError from './middlewares/handleErrors';

const app = express()

app.use(json())
app.use(cors())
app.disable('x-powered-by')
app.use(CookieParser())

const port = process.env.PORT ?? 5000;

app.use(CreateProductsRouter())

app.use(HandleError)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})