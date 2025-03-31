import pkg from 'pg'
import { envs } from './config'
const { Pool } = pkg

const configPool = { connectionString: envs.postgresUrl }
export const db = new Pool(configPool)

db.query('SELECT NOW()')
    .then((res) => {
        console.log('Connection successfully to PostgreSQL:', res.rows[0])
    })
    .catch((error: Error) => {
        console.error('Error connect to PostgreSQL:', error)
    })