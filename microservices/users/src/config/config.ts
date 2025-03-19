import * as path from 'path'
import * as dotenv from 'dotenv'

const envPath = path.resolve(__dirname, '../../../../.env')
dotenv.config({ path: envPath })

const config = {
    server: {
        port: process.env.USER_PORT ?? 4002
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
        origins: [process.env.ALLOWED_ORIGIN, 'http://localhost:3000', 'http://localhost:4000']
    },
    adminPass: {
        password: process.env.PASS_ADMIN ?? 'Admin123'
    },
    salt: {
        salt: Number(process.env.SALT_ROUNDS ?? 10)
    }
}

export default config