import { createProxyMiddleware } from "http-proxy-middleware"
import logger from "../utils/logger"
import { IncomingMessage } from "http"
import { Request, Response } from "express"
import { authUrl } from "../constants/urls"


export const AuthProxy = createProxyMiddleware({
    target: authUrl,
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