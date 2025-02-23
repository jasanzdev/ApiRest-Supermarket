import express, { json } from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import HandleError from './middleware/errorHandler'
import { CreateAuthRouter } from './routes/auth'

const app = express()
app.use(json())
app.use(cors())
app.use(cookieParser())
app.disable('x-powered-by')

const port = process.env.PORT ?? 4000

app.use(CreateAuthRouter())

app.use(HandleError)

app.listen(port, () => {
    console.log(`Authenticate microservices is running on http://localhost:${port}`)
})

export default app