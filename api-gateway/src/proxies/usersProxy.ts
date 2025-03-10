import { createProxyMiddleware } from 'http-proxy-middleware'
import { usersUrl } from '../constants/urls'
import logger from '../utils/logger'
import { ClientRequest } from 'http'
import { Request, Response } from 'express'
import { ManageUserAuthorized } from '../utils/userAuthorized'

export const UsersProxy = createProxyMiddleware({
    target: usersUrl,
    changeOrigin: true,
    pathRewrite: { '^/users': '' },
    on: {
        proxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
            const apiSecretKey = req.secret as string
            proxyReq.setHeader('API_KEY', apiSecretKey)
            logger.info('Info Users', {
                ip: req.ip,
                user: req.user,
                method: req.method,
                url: req.originalUrl
            })

            const user = req.user
            if (!user) {
                res.status(401).json({ message: 'Access not authorized' })
                proxyReq.destroy()
                return
            }
            ManageUserAuthorized(user, proxyReq, res)
        },
        error: (err) => {
            logger.error('Error response users', {
                message: err.message,
                stack: err.stack
            })
        }
    }
})