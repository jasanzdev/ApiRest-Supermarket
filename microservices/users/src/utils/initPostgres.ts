import pkg from 'pg'
import bcrypt from 'bcryptjs'
import { SuperAdmin } from '../constants/adminUser'
import config from '../config/config'
const { Pool } = pkg

export async function startServer() {
    if (config.node_env.development) {
        await CreateDatabase()
        await CreateTableUsers()
    }
}

const CreateDatabase = async () => {
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

const CreateTableUsers = async () => {
    const client = new Pool(config.postgres)

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

    const hashPassword = await bcrypt.hash(SuperAdmin.password, 10)
    const { name, username, email, role } = SuperAdmin
    await client.query(`INSERT INTO users (name, username, password, email, role) 
            VALUES($1,$2,$3,$4,$5) 
            ON CONFLICT (username) DO NOTHING`,
        [name, username, hashPassword, email, role])
}