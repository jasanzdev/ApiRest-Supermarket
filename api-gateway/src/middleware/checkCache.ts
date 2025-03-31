import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import logger from '../utils/logger'
import redisClient from '../config/redisClient'

export const CheckCache: RequestHandler = CatchErrors(async (req, res, next) => {

    if (req.method !== 'GET') {
        const pattern = `${req.baseUrl}\\?*`
        const keysToDelete = [req.baseUrl, req.originalUrl]
        const keys = await redisClient.keys(pattern)
        keysToDelete.push(...keys)
        await redisClient.del(keysToDelete)
        next()
        return
    }

    const cacheKey = req.originalUrl.endsWith('/')
        ? req.originalUrl.slice(0, -1)
        : req.originalUrl

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
