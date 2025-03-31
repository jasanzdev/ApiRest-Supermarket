import express, { json } from 'express'
import cors from 'cors'
import CookieParser from 'cookie-parser'
import { CreateProductsRouter } from './routes/productRoutes'
import HandleError from './middlewares/handleErrors'
import { VerifySecretKey } from './middlewares/verifySecretKey'
import { AuthorizeUserRole } from './middlewares/authorizeUserRole'
import { envs } from './config/config'


const app = express()


app.use(cors())
app.use(json())
app.disable('x-powered-by')
app.use(CookieParser())

const port = envs.port

app.use(AuthorizeUserRole)
app.use(VerifySecretKey)
app.use(CreateProductsRouter())

app.use(HandleError)

app.listen(port, () => {
    console.log(`Service Products running on http://localhost:${port}`)
})
