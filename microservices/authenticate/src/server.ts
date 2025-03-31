import { envs } from './config/config'
import express from 'express'

const app = express()

const port = envs.port

app.listen(port, () => {
    console.log(`Service Authentication is running on http://localhost:${port}`)
})

export default app