import { createProxyMiddleware } from 'http-proxy-middleware'
import { usersUrl } from '../constants/urls'
import logger from '../utils/logger'
import { ClientRequest } from 'http'
import { Request, Response } from 'express'
import { UserAuthorized } from '../utils/userAuthorized'
import { StoreDataInCache } from '../services/storeDataInCache'

export const UsersProxy = createProxyMiddleware({
    target: usersUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: { '^/users': '' },
    on: {
        proxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
            logger.info('Info Users', {
                ip: req.ip,
                user: req.user,
                method: req.method,
                url: req.originalUrl
            })
            const apiSecretKey = req.secret as string
            proxyReq.setHeader('X-API-KEY', apiSecretKey)
            const user = req.user
            if (!user) {
                res.status(401).json({ message: 'Access not authorized' })
                proxyReq.destroy()
                return
            }
            UserAuthorized(proxyReq, req, res)
        },
        proxyRes: (proxyRes, req, res) => {
            if (proxyRes.statusCode === 204) {
                res.status(204).end()
                return
            }
            const contentType = proxyRes.headers['content-type']
            if (!(contentType?.includes('application/json'))) {
                res.status(415).end()
                proxyRes.destroy()
                return
            }
            const body: Buffer[] = []
            const url = req.originalUrl

            proxyRes.on('data', (chunk: Buffer) => {
                body.push(chunk)
            })

            proxyRes.on('end', async () => {
                const response = await StoreDataInCache(body, url, req.method)
                res.status(proxyRes.statusCode ?? 200).json(JSON.parse(response))
            })
        },
        error: (err, req, res) => {
            logger.error('Error response users', {
                message: err.message,
                stack: err.stack
            })
            res.end('Something went wrong!!')
        }
    }
})