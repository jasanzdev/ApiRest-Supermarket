import config from './config/config'
import express from 'express'

const app = express()

const port = config.server.port

app.listen(port, () => {
    console.log(`Shopping cart services is running on http://localhost:${port}`)
})

export default app