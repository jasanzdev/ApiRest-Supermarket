import { createProxyMiddleware } from "http-proxy-middleware"
import OnProxyReq from "../utils/onProxyReq"
import logger from "../utils/logger"

const target = process.env.NODE_ENV === 'production' ? 'http://products:4001/' : 'http://localhost:4001/'
export const ProductProxy = createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: { '^/products': '' },
    on: {
        proxyReq: OnProxyReq.proxyReqProducts,
        error: (err) => {
            logger.log('error', `Error response products: ${err.message}`)
        }
    }
})