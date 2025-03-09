import { RequestHandler } from 'express'
import redisClient from '../utils/redisClient'

export const CheckCache: RequestHandler = async (req, res, next) => {
    const cacheKey = req.originalUrl

    const cacheResponse = await redisClient.get(cacheKey)

    if (cacheResponse) {
        res.status(200).json(JSON.parse(cacheResponse))
        return
    }

    next()
}
