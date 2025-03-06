import pkg from 'pg'
const { Pool } = pkg

export async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
        await CreateDatabase()
        await CreateTableSession()
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

const CreateTableSession = async () => {
    const client = new Pool({
        user: process.env.DB_LOCAL_USER,
        host: process.env.DB_LOCAL_HOST,
        database: process.env.DB_LOCAL_NAME,
        password: process.env.DB_LOCAL_PASSWORD,
        port: Number(process.env.DB_LOCAL_PORT)
    })

    await client.query(`CREATE TABLE IF NOT EXISTS session (
                id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL,
                user_agent TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (user_id, user_agent),
                FOREIGN KEY (user_id) REFERENCES "users" (id)
    )`)
}