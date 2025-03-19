import { Pool } from 'pg'
import config from '../config/config'

export const StartServer = async () => {
    if (config.node_env.development) {
        await checkExistDatabase()
        await createTableCart()
        await createTableOrders()
    }
}

const checkExistDatabase = async () => {
    const client = new Pool({
        user: config.postgres.user,
        host: config.postgres.host,
        password: config.postgres.password,
        port: config.postgres.port
    })
    try {
        await client.connect()
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = '${config.postgres.database}'`
        )
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE ${config.postgres.database}`)
        }
    } finally {
        client.end()
    }
}

const createTableCart = async () => {
    const client = new Pool(config.postgres)
    await client.query(
        `CREATE TABLE IF NOT EXISTS cart (
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL UNIQUE,
            products JSONB NOT NULL DEFAULT '[]',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE)`
    )
}

const createTableOrders = async () => {
    const client = new Pool(config.postgres)
    await client.query(
        `CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        products JSONB NOT NULL DEFAULT '[]',
        total DECIMAL(8,2) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE)`
    )
}