import { createProxyMiddleware } from "http-proxy-middleware"
import OnProxyReq from "../utils/onProxyReq"
import logger from "../utils/logger"

export const ProductProxy = createProxyMiddleware({
    target: process.env.NODE_ENV === 'production' ? 'http://authentication:4001/' : 'http://localhost:4001/',
    changeOrigin: true,
    pathRewrite: { '^/products': '' },
    on: {
        proxyReq: OnProxyReq.proxyReqProducts,
        error: (err) => {
            logger.log('error', `Error response products: ${err.message}`)
        }
    }
})