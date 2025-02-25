import { createProxyMiddleware } from "http-proxy-middleware"
import logger from "../utils/logger"

export const AuthProxy = createProxyMiddleware({
    target: process.env.NODE_ENV === 'production' ? 'http://products:4000/' : 'http://localhost:4000/',
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: {
        error: (err) => {
            logger.log('error', `Error Auth: ${err.message} ${err.stack}`)
        }
    }
})