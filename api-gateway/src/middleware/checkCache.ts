import { RequestHandler } from 'express'
import redisClient from '../utils/redisClient'
import CatchErrors from '../utils/catchErrors'

export const CheckCache: RequestHandler = CatchErrors(async (req, res, next) => {
    if (req.method !== 'GET') {
        next()
        return
    }

    let cacheKey = req.originalUrl
    if (cacheKey.endsWith('/')) {
        cacheKey = cacheKey.slice(0, -1)
    }

    const cacheResponse = await redisClient.get(cacheKey)

    if (cacheResponse) {
        res.status(200).json(JSON.parse(cacheResponse))
        return
    }

    next()
})
