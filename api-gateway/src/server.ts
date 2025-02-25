import express from 'express'
import 'dotenv/config'

const app = express()

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log(`Api gateway is running on http://localhost:${port}`)
})

export default app
