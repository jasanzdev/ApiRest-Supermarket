"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProxy = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const onProxyReq_1 = __importDefault(require("../services/onProxyReq"));
const logger_1 = __importDefault(require("../logger"));
exports.ProductProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:4001/',
    changeOrigin: true,
    pathRewrite: { '^/products': '' },
    on: {
        proxyReq: onProxyReq_1.default.proxyReqProducts,
        proxyRes: (proxyRes) => {
            logger_1.default.log('info', `Response Products: ${proxyRes.statusMessage}:${proxyRes.statusCode}`);
        },
        error: (err) => {
            logger_1.default.log('error', `Error response products: ${err.message}`);
        }
    }
});
