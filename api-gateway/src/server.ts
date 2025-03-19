<<<<<<< HEAD
import config from './config/config'
import express from 'express'
=======
import * as path from 'path'
import * as dotenv from 'dotenv'
import express from 'express'
import { config } from './config/config'

const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd

const app = express()

const port = config.server.port

app.listen(port, () => {
    console.log(`Api gateway is running on http://localhost:${port}`)
})

export default app
