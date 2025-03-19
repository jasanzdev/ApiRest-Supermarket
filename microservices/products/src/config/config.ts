import * as path from 'path'
import * as dotenv from 'dotenv'

const envPath = path.resolve(__dirname, '../../../../.env')
dotenv.config({ path: envPath })

const config = {
    server: {
        port: process.env.PRODUCTS_PORT ?? 4001
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
<<<<<<< HEAD
        connectionString: process.env.DATABASE_URL
=======
        connectionString: process.env.DB_LOCAL_NAME
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd
    },
    node_env: {
        development: process.env.NODE_ENV !== 'production',
    },
    allowedOrigins: {
        origins: [process.env.ALLOWED_ORIGIN, 'http://localhost:3000']
    }
}

export default config