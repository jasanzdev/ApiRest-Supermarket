import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from '../utils/logger'
import { IncomingMessage } from 'http'
import { Request, Response } from 'express'
import { authUrl } from '../constants/urls'
import OnProxyReq from '../services/onProxyReq'


export const AuthProxy = createProxyMiddleware({
    target: authUrl,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: {
        proxyReq: OnProxyReq.proxyReqAuth,
        proxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
            const accessToken = proxyRes.headers.authorization
            if (accessToken) {
                res.setHeader('Authorization', accessToken)
            }
        },
        error: (err) => {
            console.log(err)
            logger.error('Error response Auth', {
                message: err.message,
                stack: err.stack
            })
        }
    }
})