import pkg from 'pg'
const { Pool } = pkg

export const db = new Pool(process.env.NODE_ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
    }
    : {
        user: process.env.DB_LOCAL_USER,
        host: process.env.DB_LOCAL_HOST,
        database: process.env.DB_LOCAL_NAME,
        password: process.env.DB_LOCAL_PASSWORD,
        port: Number(process.env.DB_LOCAL_PORT)
    }
)

db.query('SELECT NOW()')
    .then((res) => {
        console.log('Connection successfully to PostgreSQL:', res.rows[0])
    })
    .catch((error) => {
        console.error('Error attempt connect to PostgreSQL:', error)
    })