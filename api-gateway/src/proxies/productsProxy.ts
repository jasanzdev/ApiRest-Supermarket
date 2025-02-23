import { createProxyMiddleware } from "http-proxy-middleware"
import OnProxyReq from "../services/onProxyReq"
import logger from "../logger"

export const ProductProxy = createProxyMiddleware({
    target: 'http://localhost:4001/',
    changeOrigin: true,
    pathRewrite: { '^/products': '' },
    on: {
        proxyReq: OnProxyReq.proxyReqProducts,
        proxyRes: (proxyRes) => {
            logger.log('info', `Response Products: ${proxyRes.statusMessage}:${proxyRes.statusCode}`)
        },
        error: (err) => {
            logger.log('error', `Error response products: ${err.message}`)
        }
    }
})