import * as path from 'path'
import * as dotenv from 'dotenv'

const envPath = path.resolve(__dirname, '../../../../.env')
dotenv.config({ path: envPath })
import crypto from 'node:crypto'

const config = {
    server: {
        port: process.env.AUTH_PORT ?? 4000
    },
    redis: {
        url: process.env.REDIS_URL ?? 'redis://localhost:6379'
    },
    postgres: {
        user: process.env.DB_LOCAL_USER,
        host: process.env.DB_LOCAL_HOST,
        database: process.env.DB_LOCAL_NAME,
        password: process.env.DB_LOCAL_PASSWORD,
        port: Number(process.env.DB_LOCAL_PORT)
    },
    productionDB: process.env.DATABASE_URL,
    node_env: {
        development: process.env.NODE_ENV !== 'production',
    },
    allowedOrigins: {
        origins: [process.env.ALLOWED_ORIGIN, 'http://localhost:3000']
    },
    jwt: {
        accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY
            ?? crypto.randomBytes(32).toString('base64'),
        refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY
            ?? crypto.randomBytes(32).toString('base64')
    }
}

export default config