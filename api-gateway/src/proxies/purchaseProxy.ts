import { createProxyMiddleware } from 'http-proxy-middleware'
import { ClientRequest } from 'http'
import { Request, Response } from 'express'
import { UserAuthorized } from '../utils/userAuthorized'
import { purchaseUrl } from '../constants/urls'

export const PurchaseProxy = createProxyMiddleware({
    target: purchaseUrl,
    changeOrigin: true,
    pathRewrite: { '^/purchase': '' },
    on: {
        proxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
            const apiSecretKey = req.secret as string
            const user = req.user

            if (!user) {
                res.status(401).json({
                    'error': 'Unauthorized',
                    'message': 'User identification information has not been provided.'
                })
                proxyReq.destroy()
                return
            }
            proxyReq.setHeader('X-API-KEY', apiSecretKey)
            proxyReq.setHeader('X-USER', JSON.stringify(user))
            UserAuthorized(proxyReq, req, res)
        }
    }
})