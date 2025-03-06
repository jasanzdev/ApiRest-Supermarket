import { createProxyMiddleware } from "http-proxy-middleware"
import OnProxyReq from "../utils/onProxyReq"
import logger from "../utils/logger"
import { productsUrl } from "../constants/urls"

export const ProductProxy = createProxyMiddleware({
    target: productsUrl,
    changeOrigin: true,
    pathRewrite: { '^/products': '' },
    on: {
        proxyReq: OnProxyReq.proxyReqProducts,
        error: (err) => {
            logger.log('error', `Error response products: ${err.message}`)
        }
    }
})