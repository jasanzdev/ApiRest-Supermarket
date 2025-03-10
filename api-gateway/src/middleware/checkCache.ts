import { RequestHandler } from 'express'
import redisClient from '../utils/redisClient'
import CatchErrors from '../utils/catchErrors'
import logger from '../utils/logger'

export const CheckCache: RequestHandler = CatchErrors(async (req, res, next) => {
    if (req.method === 'GET') {
        let cacheKey = req.originalUrl
        if (cacheKey.endsWith('/')) {
            cacheKey = cacheKey.slice(0, -1)
        }

        logger.info('Response cache', {
            cacheKey: cacheKey
        })

        const cacheResponse = await redisClient.get(cacheKey)

        if (cacheResponse) {
            res.status(200).json(JSON.parse(cacheResponse))
            return
        }
    }
    next()
})
