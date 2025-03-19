import pkg from 'pg'
const { Pool } = pkg
import config from '../config/config'

export const db = new Pool(!config.node_env.development
    ? config.productionDB
    : config.postgres
)

db.query('SELECT NOW()')
    .then((res) => {
        console.log('Connection successfully to PostgreSQL:', res.rows[0])
    })
    .catch((error) => {
        console.error('Error attempt connect to PostgreSQL:', error)
    })