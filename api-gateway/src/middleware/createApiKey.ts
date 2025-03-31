import { NextFunction, Request, Response } from 'express'
import crypto from 'node:crypto'
import redisClient from '../config/redisClient'

export const CreateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    const existKey = await redisClient.get('secret_api_key')

    if (!existKey) {
        const secretKey = crypto.randomBytes(32).toString('base64')
        await redisClient.set('secret_api_key', secretKey, { EX: 60 })
        req.secret = secretKey
        next()
        return
    }
    req.secret = existKey
    next()
}
