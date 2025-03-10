import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from '../utils/logger'
import { ClientRequest, IncomingMessage } from 'http'
import { Request, Response } from 'express'
import { authUrl } from '../constants/urls'


export const AuthProxy = createProxyMiddleware({
    target: authUrl,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: {
        proxyReq: (proxyReq: ClientRequest, req: Request) => {
            const apiSecretKey = req.secret as string
            proxyReq.setHeader('API_KEY', apiSecretKey)
        },
        proxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
            const accessToken = proxyRes.headers.authorization
            if (accessToken) {
                res.setHeader('Authorization', accessToken)
            }
        },
        error: (err, req, res) => {
            console.log(err)
            logger.error('Error response Auth', {
                message: err.message,
                stack: err.stack
            })
            res.end('Something went wrong!!')
        }
    }
})