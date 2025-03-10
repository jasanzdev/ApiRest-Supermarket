import { createProxyMiddleware } from 'http-proxy-middleware'
import { usersUrl } from '../constants/urls'
import logger from '../utils/logger'
import { ClientRequest } from 'http'
import { Request, Response } from 'express'
import { ManageUserAuthorized } from '../utils/userAuthorized'
import { StoreDataInCache } from '../services/storeDataInCache'

export const UsersProxy = createProxyMiddleware({
    target: usersUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: { '^/users': '' },
    on: {
        proxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
            const apiSecretKey = req.secret as string
            proxyReq.setHeader('API_KEY', apiSecretKey)
            logger.info('Info Users', {
                ip: req.ip,
                user: req.user,
                method: req.method,
                url: req.originalUrl
            })

            const user = req.user
            if (!user) {
                res.status(401).json({ message: 'Access not authorized' })
                proxyReq.destroy()
                return
            }
            ManageUserAuthorized(user, proxyReq, res)
        },
        proxyRes: (proxyRes, req, res) => {
            const body: Buffer[] = []

            proxyRes.on('data', (chunk: Buffer) => {
                body.push(chunk)
            })

            proxyRes.on('end', async () => {
                const response = await StoreDataInCache(
                    {
                        body: body,
                        url: req.originalUrl,
                        method: proxyRes.method
                    })

                res.status(proxyRes.statusCode ?? 200).json(JSON.parse(response))
            })
        },
        error: (err) => {
            logger.error('Error response users', {
                message: err.message,
                stack: err.stack
            })
        }
    }
})