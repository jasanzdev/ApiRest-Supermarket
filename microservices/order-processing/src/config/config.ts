import * as path from 'path'
import * as dotenv from 'dotenv'

const envPath = path.resolve(__dirname, '../../../../.env')
dotenv.config({ path: envPath })

const config = {
    server: {
        port: process.env.ORDER_PROCESSING_PORT ?? 4003
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
    productionDB: {
        connectionString: process.env.DATABASE_URL
    },
    node_env: {
        development: process.env.NODE_ENV !== 'production',
    },
    allowedOrigins: {
        origins: [process.env.ALLOWED_ORIGIN, 'http://localhost:3000']
    }
}

export default config