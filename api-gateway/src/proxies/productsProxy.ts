import { createProxyMiddleware } from 'http-proxy-middleware'
import OnProxyReq from '../services/onProxyReq'
import logger from '../utils/logger'
import { productsUrl } from '../constants/urls'
import redisClient from '../utils/redisClient'

export const ProductProxy = createProxyMiddleware({
    target: productsUrl,
    changeOrigin: true,
    pathRewrite: { '^/products': '' },
    selfHandleResponse: true,
    on: {
        proxyReq: OnProxyReq.proxyReqProducts,
        proxyRes: (proxyRes, req, res) => {
            const body: Buffer[] = []
            proxyRes.on('data', (chunk: Buffer) => {
                body.push(chunk)
            })
            proxyRes.on('end', async () => {
                const responseBody = Buffer.concat(body).toString()

                let cacheKey = req.originalUrl
                if (cacheKey.endsWith('/')) {
                    cacheKey = cacheKey.slice(0, -1)
                }

                if (proxyRes.method !== 'GET' && await redisClient.exists(cacheKey)) {
                    await redisClient.del([cacheKey, req.baseUrl])
                    res.status(proxyRes.statusCode ?? 200).json(JSON.parse(responseBody))
                    return
                }

                await redisClient.set(cacheKey, responseBody, { 'EX': 36000 })
                res.status(proxyRes.statusCode ?? 200).json(JSON.parse(responseBody))
            })
        },
        error: (err) => {
            logger.error('Error response products', {
                message: err.message,
                stack: err.stack
            })
        }
    }
})