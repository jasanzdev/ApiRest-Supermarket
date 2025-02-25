import pkg from 'pg';
const { Pool } = pkg;


export const db = new Pool(process.env.NODE_ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
    }
    : {
        user: 'postgres',
        host: 'localhost',
        database: 'supermarket-dev',
        password: 'Postgres123',
        port: 5433,
    }
);

db.query('SELECT NOW()')
    .then((res) => {
        console.log('Connection successfully to PostgreSQL:', res.rows[0]);
    })
    .catch((error) => {
        console.error('Error attempt connect to PostgreSQL:', error);
    });