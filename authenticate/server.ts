import express from 'express'
import 'dotenv/config'


const app = express()

const port = process.env.PORT ?? 4000

app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`)
})

export default app