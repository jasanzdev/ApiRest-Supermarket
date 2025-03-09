import express from 'express'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { config } from './config/config'

const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

const app = express()

const port = config.server.port

app.listen(port, () => {
    console.log(`Api gateway is running on http://localhost:${port}`)
})

export default app
