import { createProxyMiddleware } from "http-proxy-middleware"
import logger from "../utils/logger"

const target = process.env.NODE_ENV === 'production' ? 'http://authentication:4000/' : 'http://localhost:4000/'
export const AuthProxy = createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: {
        error: (err) => {
            logger.log('error', `Error Auth: ${err.message} ${err.stack}`)
        }
    }
})