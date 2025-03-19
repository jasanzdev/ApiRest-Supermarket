import pkg from 'pg'
import config from './config'
const { Pool } = pkg

const configPool = config.node_env.development
    ? config.postgres
    : { connectionString: config.productionDB }

console.log(configPool)
export const db = new Pool(configPool)

db.query('SELECT NOW()')
    .then((res) => {
        console.log('Connection successfully to PostgreSQL:', res.rows[0])
    })
    .catch((error) => {
        console.error('Error attempt connect to PostgreSQL:', error)
    })