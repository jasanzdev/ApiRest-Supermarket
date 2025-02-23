import { Request, Response } from "express"
import { ClientRequest } from "http"
import { Authenticate } from "../middleware/authenticate"
import { AuthorizedUser } from "../utils/userAuthorized"
import { MethodsRequireAuth } from "../constants/methods"
import HandleError from "./handleError"
import logger from "../logger"

export default class OnProxyReq {
    static readonly proxyReqProducts = (proxyReq: ClientRequest, req: Request, res: Response) => {
        logger.log('info', `Info Products: ${req.method} ${req.url}`)
        if (MethodsRequireAuth.includes(req.method)) {
            Authenticate.verifyToken(req, res)
                .then(user => AuthorizedUser(user, proxyReq, res))
                .catch(error => HandleError.authenticateError(error, proxyReq, req, res))
        }
    }
}


