import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redisClient from '../utils/redisClient'
import logger from '../utils/logger'
import { NextFunction, Request, Response } from 'express'


export const RateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 20,
    message: 'Too many requests. You have exceeded the request limit',
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
    handler: (req: Request, res: Response, next: NextFunction) => {
        const key = req.user?.id ?? req.ip ?? 'unknown_ip'
        const redisRateLimitKey = `rate-limit:${key}`
        const penaltyKey = `penalty:${key}`

        Promise.all([
            redisClient.set(penaltyKey, '1', { EX: 300 }),
            redisClient.del(redisRateLimitKey)
        ]).catch(error => next(error))

        logger.error('Request limit exceeded', {
            user: req.user.username,
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
        })
        res.status(429).json({ error: 'Too Many Requests, You have exceeded the request limit' })
    }
})

export const CheckPenalty = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.user?.id ?? req.ip ?? 'unknown_ip'
    const penaltyKey = `penalty:${key}`

    try {
        const penalized = await redisClient.exists(penaltyKey)
        if (penalized) {
            res.status(429).json({
                error: 'Too Many Requests. Try again in 5 minutes.'
            })
            return
        }
        next()
    } catch (error) {
        next(error)
    }
}