import pkg from 'pg'
import config from '../config/config'
const { Pool } = pkg

export async function startServer() {
    if (config.node_env.development) {
        await CreateDatabase()
        await CreateTableSession()
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

const CreateTableSession = async () => {
    const client = new Pool(config.postgres)

    await client.query(`CREATE TABLE IF NOT EXISTS session (
                id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL,
                user_agent TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (user_id, user_agent),
                FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
    )`)
}