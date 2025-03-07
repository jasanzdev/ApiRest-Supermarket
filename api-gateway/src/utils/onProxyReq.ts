import { Request, Response } from "express"
import { ClientRequest } from "http"
import { MethodsRequireAuth } from "../constants/methods"
import logger from "./logger"
import { ManageUserAuthorized, ProductsAuthorized } from "./userAuthorized"

export default class OnProxyReq {
    static readonly proxyReqProducts = (proxyReq: ClientRequest, req: Request, res: Response) => {
        logger.info('Info Products', {
            ip: req.ip,
            user: req.user,
            method: req.method,
            url: req.originalUrl
        })
        if (MethodsRequireAuth.includes(req.method)) {
            const user = req.user
            if (!user) {
                res.status(401).json({ message: 'Access not authorized' })
                proxyReq.destroy()
                return
            }
            ProductsAuthorized(user, proxyReq, res)
        }
    }

    static readonly proxyReqUsers = (proxyReq: ClientRequest, req: Request, res: Response) => {
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
    }
}


