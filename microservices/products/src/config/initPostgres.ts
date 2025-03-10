import pkg from 'pg'
const { Pool } = pkg

export async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
        await CreateDatabase()
        await CreateTableProduct()
    }
}

const CreateDatabase = async () => {
    const client = new Pool({
        user: process.env.DB_LOCAL_USER,
        host: process.env.DB_LOCAL_HOST,
        password: process.env.DB_LOCAL_PASSWORD,
        port: Number(process.env.DB_LOCAL_PORT)
    })

    try {
        await client.connect()
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_LOCAL_NAME}'`
        )
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE ${process.env.DB_LOCAL_NAME}`)
        }
    } finally {
        client.end()
    }
}

const CreateTableProduct = async () => {
    const client = new Pool({
        user: process.env.DB_LOCAL_USER,
        host: process.env.DB_LOCAL_HOST,
        database: process.env.DB_LOCAL_NAME,
        password: process.env.DB_LOCAL_PASSWORD,
        port: Number(process.env.DB_LOCAL_PORT)
    })

    await client.query(`CREATE TABLE IF NOT EXISTS product(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR NOT NULL,
            price_purchase DECIMAL(8,2) NOT NULL,
            price_sale DECIMAL(8,2) NOT NULL,
            stock INTEGER NOT NULL,
            threshold INTEGER,
            active BOOLEAN NOT NULL DEFAULT TRUE,
            thumbnail TEXT,
            code BIGINT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)
}