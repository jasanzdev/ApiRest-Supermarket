import config from './config/config'
import express from 'express'
<<<<<<< HEAD
import { startServer } from './utils/initPostgres'
=======
import * as path from 'path'
import * as dotenv from 'dotenv'
import { startServer } from './utils/initPostgres'

const envPath = path.resolve(__dirname, '../../../.env')
dotenv.config({ path: envPath })
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd

const app = express()

const port = config.server.port

startServer()
    .then(() => {
        app.listen(port, () => {
            console.log(`Users Services running on http://localhost:${port}`)
        })
    }).catch((error) => console.log('Error initializing server:', error))



export default app