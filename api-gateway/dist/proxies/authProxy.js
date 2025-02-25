"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProxy = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const logger_1 = __importDefault(require("../logger"));
exports.AuthProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:4000/',
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: {
        proxyReq: (proxyReq, req, res) => {
            logger_1.default.log('info', `Info auth: ${proxyReq.method} ${req.url} - ${res.statusCode}`);
        },
        error: (err) => {
            logger_1.default.log('error', `Error Auth: ${err.message}`);
        }
    }
});
