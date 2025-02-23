import { ClientRequest } from "http"
import { createProxyMiddleware } from "http-proxy-middleware"
import logger from "../logger"
import { Request, Response } from "express"

export const AuthProxy = createProxyMiddleware({
    target: 'http://localhost:4000/',
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: {
        proxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
            logger.log('info', `Info auth: ${proxyReq.method} ${req.url} - ${res.statusCode}`)
        },
        error: (err) => {
            logger.log('error', `Error Auth: ${err.message}`)
        }
    }
})