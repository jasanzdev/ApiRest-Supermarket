import app from './server'
import { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import HandleError from './middleware/errorHandler'
import { CreateAuthRouter } from './routes/auth'

app.use(cors())
app.use(json())
app.use(cookieParser())
app.disable('x-powered-by')

app.use(CreateAuthRouter())
app.use(HandleError)


export default app