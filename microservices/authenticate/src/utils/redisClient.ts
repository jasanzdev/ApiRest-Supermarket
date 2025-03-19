import { createClient } from 'redis'
import config from '../config/config'

const redisClient = createClient(config.redis)

redisClient.connect().catch((err) => {
    console.error('Error connecting to Redis:', err)
})

export default redisClient