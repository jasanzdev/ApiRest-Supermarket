import pkg from 'pg';
const { Pool } = pkg;


export const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
})

db.query('SELECT NOW()')
    .then((res) => {
        console.log('Connection successfully to PostgreSQL:', res.rows[0]);
    })
    .catch((error) => {
        console.error('Error attempt connect to PostgreSQL:', error);
    });