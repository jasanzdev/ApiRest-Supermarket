import app from './server'
import { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import HandleError from './middleware/errorHandler'
import { CreateAuthRouter } from './routes/authRoutes'
import { VerifySecretKey } from './middleware/verifySecretKey'

const allowedOrigins = [process.env.ALLOWED_ORIGIN, 'http://localhost:3000']

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
app.use(CreateAuthRouter())
app.use(HandleError)


export default app