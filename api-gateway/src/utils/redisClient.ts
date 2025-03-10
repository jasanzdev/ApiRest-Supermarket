import { createClient } from 'redis'
import { config } from '../config/config'

const redisClient = createClient({
    url: config.redis.url,
})

redisClient.connect().catch((err) => {
    console.error('Error connecting to Redis:', err)
})

export default redisClient