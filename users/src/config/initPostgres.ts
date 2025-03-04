import pkg from 'pg'
import bcrypt from 'bcryptjs'
const { Pool } = pkg

export async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
        await CreateDatabase()
        await CreateTableUsers()
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

const CreateTableUsers = async () => {
    const client = new Pool({
        user: process.env.DB_LOCAL_USER,
        host: process.env.DB_LOCAL_HOST,
        database: process.env.DB_LOCAL_NAME,
        password: process.env.DB_LOCAL_PASSWORD,
        port: Number(process.env.DB_LOCAL_PORT)
    })

    await client.query(`CREATE TABLE IF NOT EXISTS users(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(100) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            role VARCHAR(50) NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)

    const hashPassword = await bcrypt.hash('Admin123', 10)
    await client.query(`INSERT INTO users (name, username, password, email, role) 
            VALUES('admin','admin','${hashPassword}','supermarket_admin@gmail.com','ADMIN') 
            ON CONFLICT (username) DO NOTHING`)
}