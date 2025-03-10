import { RequestHandler } from 'express'
import redisClient from '../utils/redisClient'
import CatchErrors from '../utils/catchErrors'
import logger from '../utils/logger'

export const CheckCache: RequestHandler = CatchErrors(async (req, res, next) => {
    let cacheKey = req.originalUrl

    if (cacheKey.endsWith('/')) {
        cacheKey = cacheKey.slice(0, -1)
    }

    const cacheResponse = await redisClient.get(cacheKey)

    if (cacheResponse) {
        logger.info('Response cache', {
            cacheKey: cacheKey
        })
        res.status(200).json(JSON.parse(cacheResponse))
        return
    }
    next()
})
