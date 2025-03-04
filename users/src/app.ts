import { json } from 'express'
import app from './server'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CreateUsersRouter } from './routes/users'

app.use(cors())
app.use(json())
app.use(cookieParser())
app.disable('x-powered-by')

app.use(CreateUsersRouter())

export default app