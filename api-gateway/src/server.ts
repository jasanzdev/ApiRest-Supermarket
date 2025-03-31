import express from 'express'
import { envs } from './config/config'

const app = express()

const port = envs.port

app.listen(port, () => {
    console.log(`Api gateway is running on http://localhost:${port}`)
})

export default app
