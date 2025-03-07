import { createProxyMiddleware } from "http-proxy-middleware"
import { usersUrl } from "../constants/urls"
import OnProxyReq from "../utils/onProxyReq"
import logger from "../utils/logger"

export const UsersProxy = createProxyMiddleware({
    target: usersUrl,
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
    on: {
        proxyReq: OnProxyReq.proxyReqUsers,
        error: (err) => {
            logger.error('Error response users', {
                message: err.message,
                stack: err.stack
            })
        }
    }
})