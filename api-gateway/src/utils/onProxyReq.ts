import { Request, Response } from "express"
import { ClientRequest } from "http"
import { MethodsRequireAuth } from "../constants/methods"
import { AuthorizedUser } from "./userAuthorized"
import logger from "./logger"

export default class OnProxyReq {
    static readonly proxyReqProducts = (proxyReq: ClientRequest, req: Request, res: Response) => {
        logger.log('info', `Info Products: ${req.method} ${req.url}`)
        if (MethodsRequireAuth.includes(req.method)) {
            const user = req.user
            if (!user) {
                res.status(401).json({ message: 'Access not authorized' })
                proxyReq.destroy()
                return
            }
            AuthorizedUser(user, proxyReq, res)
        }
    }
}


