import { json } from 'express'
import app from './server'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CreateUsersRouter } from './routes/userRoutes'
import { ErrorHandler } from './middlewares/errorHandler'
import { VerifySecretKey } from './middlewares/verifySecretKey'

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
app.use(cookieParser())
app.disable('x-powered-by')

app.use(VerifySecretKey)
app.use(CreateUsersRouter())
app.use(ErrorHandler)


export default app