import app from './server'
import { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import HandleError from './middleware/errorHandler'
import { CreateAuthRouter } from './routes/authRoutes'
import { VerifySecretKey } from './middleware/verifySecretKey'


app.use(cors())
app.use(json())
app.use(cookieParser())
app.disable('x-powered-by')

app.use(VerifySecretKey)
app.use(CreateAuthRouter())
app.use(HandleError)


export default app