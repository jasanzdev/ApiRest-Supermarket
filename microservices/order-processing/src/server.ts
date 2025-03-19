import config from './config/config'
import express from 'express'
import { StartServer } from './utils/initPostgres'

const app = express()

const port = config.server.port

async function main() {
    try {
        await StartServer()
        app.listen(port, () => {
            console.log(`Shopping cart services is running on http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()

export default app