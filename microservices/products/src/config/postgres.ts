import config from './config'
import pkg from 'pg'
const { Pool } = pkg

const configPool = { connectionString: config.postgresDocker }

export const db = new Pool(configPool)

db.query('SELECT NOW()')
    .then((res) => {
        console.log('Connection successfully to PostgreSQL:', res.rows[0])
    })
    .catch((error) => {
        console.error('Error attempt connect to PostgreSQL:', error)
    })