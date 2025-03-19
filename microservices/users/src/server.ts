import express from 'express'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { startServer } from './utils/initPostgres'

const envPath = path.resolve(__dirname, '../../../.env')
dotenv.config({ path: envPath })

const app = express()

const port = process.env.USER_PORT ?? 4002

startServer()
    .then(() => {
        app.listen(port, () => {
            console.log(`Users Services running on http://localhost:${port}`)
        })
    }).catch((error) => console.log('Error initializing server:', error))



export default app