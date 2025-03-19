import * as path from 'path'
import * as dotenv from 'dotenv'

const envPath = path.resolve(__dirname, '../../../.env')
dotenv.config({ path: envPath })

const config = {
    server: {
        port: process.env.GATEWAY_PORT ?? 3000
    },
    redis: {
        url: process.env.REDIS_URL ?? 'redis://localhost:6379'
    },
    allowedOrigins: {
        origins: [process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000']
    },
    node_env: {
        development: process.env.NODE_ENV !== 'production',
    }
}

export default config