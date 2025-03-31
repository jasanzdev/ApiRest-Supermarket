import { createClient } from 'redis'
import { envs } from './config'

const redisClient = createClient({
    url: envs.redisUrl
})

redisClient.connect().catch((err) => {
    console.error('Error connecting to Redis:', err)
})

export default redisClient