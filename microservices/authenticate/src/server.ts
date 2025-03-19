import config from './config/config'
import express from 'express'
import { startServer } from './utils/initPostgres'

const app = express()

const port = config.server.port

startServer()
    .then(() => {
        app.listen(port, () => {
            console.log(`Service Authentication is running on http://localhost:${port}`)
        })
    }).catch(error => console.log('Error initializing server:', error))

export default app