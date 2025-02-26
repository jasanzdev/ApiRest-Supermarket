import { createProxyMiddleware } from "http-proxy-middleware"
import logger from "../utils/logger"
import { IncomingMessage } from "http"
import { Request, Response } from "express"

const target = process.env.NODE_ENV === 'production' ? 'http://authentication:4000/' : 'http://localhost:4000/'
export const AuthProxy = createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: {
        proxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
            const accessToken = proxyRes.headers.authorization
            if (accessToken) {
                res.setHeader('Authorization', accessToken)
            }
        },
        error: (err) => {
            logger.log('error', `Error Auth: ${err.message} ${err.stack}`)
        }
    }
})