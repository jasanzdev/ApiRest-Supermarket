import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from '../utils/logger'
import { productsUrl } from '../constants/urls'
import redisClient from '../utils/redisClient'
import { ClientRequest } from 'http'
import { Request, Response } from 'express'
import { MethodsRequireAuth } from '../constants/methods'
import { ProductsAuthorized } from '../utils/userAuthorized'

export const ProductProxy = createProxyMiddleware({
    target: productsUrl,
    changeOrigin: true,
    pathRewrite: { '^/products': '' },
    selfHandleResponse: true,
    on: {
        proxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
            logger.info('Info Products', {
                ip: req.ip,
                user: req.user,
                method: req.method,
                url: req.originalUrl
            })

            const apiSecretKey = req.secret as string
            proxyReq.setHeader('API_KEY', apiSecretKey)
            if (MethodsRequireAuth.includes(req.method)) {
                const user = req.user
                if (!user) {
                    res.status(401).json({ message: 'Access not authorized' })
                    proxyReq.destroy()
                    return
                }
                ProductsAuthorized(user, proxyReq, res)
            }
        },
        proxyRes: (proxyRes, req, res) => {
            if (proxyRes.method === 'GET') {
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

                    await redisClient.set(cacheKey, responseBody, { 'EX': 36000 })
                    res.status(proxyRes.statusCode ?? 200).json(JSON.parse(responseBody))
                })
            }
        },
        error: (err) => {
            logger.error('Error response products', {
                message: err.message,
                stack: err.stack
            })
        }
    }
})