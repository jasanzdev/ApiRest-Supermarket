import config from './config/config'
import express, { json } from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import { CreateProductsRouter } from './routes/productRoutes'
import HandleError from './middlewares/handleErrors'
import { startServer } from './utils/initPostgres'
import { VerifySecretKey } from './middlewares/verifySecretKey'
import { AuthorizeUserRole } from './middlewares/authorizeUserRole'


const app = express()

const allowedOrigins = config.allowedOrigins.origins

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

const port = config.server.port

app.use(AuthorizeUserRole)
app.use(VerifySecretKey)
app.use(CreateProductsRouter())

app.use(HandleError)

startServer()
    .then(() => {
        app.listen(port, () => {
            console.log(`Service Products running on http://localhost:${port}`)
        })
    }).catch(error => console.log('Error initializing server:', error))
