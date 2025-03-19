import pkg from 'pg'
const { Pool } = pkg
import config from '../config/config'

export async function startServer() {
    if (config.node_env.development) {
        await CreateDatabase()
        await CreateTableProduct()
        await CreateTableInventoryAdjustments()
    }
}

const CreateDatabase = async () => {
    const postgres = config.postgres
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { database, ...configWithoutDB } = postgres
    const client = new Pool(configWithoutDB)

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

const CreateTableProduct = async () => {
    const client = new Pool(config.postgres)

    await client.query(`
        CREATE TABLE IF NOT EXISTS product(
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

const CreateTableInventoryAdjustments = async () => {
    const client = new Pool(config.postgres)

    await client.query(`
        CREATE TABLE IF NOT EXISTS inventory_adjustments (
            id SERIAL PRIMARY KEY,
            product_id uuid REFERENCES product(id),
            type VARCHAR(20) CHECK (type IN ('SALE', 'PURCHASE', 'RETURN', 'CORRECTION')),
            quantity INT NOT NULL,
            previous_stock INT NOT NULL,
            new_stock INT NOT NULL,
            reason TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)
}