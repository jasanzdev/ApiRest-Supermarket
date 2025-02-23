import { Request, Response } from "express"
import { Authenticate } from "../middleware/authenticate"
import { AuthorizedUser } from "../utils/userAuthorized"
import { ClientRequest } from "http"
import { AxiosError } from "axios"
import logger from "../logger"
import { ResponseData } from "../types/responseData"

export default class HandleError {

    static readonly authenticateError = (error: AxiosError, proxyReq: ClientRequest, req: Request, res: Response) => {
        const { response } = error
        logger.log('error', `Error Verifying Token - ${response?.data}`)
        if (!response) {
            res.status(500).json({ message: 'Internal Server Error' })
            return
        }
        const data = response.data as ResponseData
        if (data && req.cookies.refresh_token) {
            if (data.errorCode === 'AccessTokenExpired') {
                Authenticate.getNewAccessToken(req, res)
                    .then(user => AuthorizedUser(user, proxyReq, res))
                    .catch(error => logger.log('error', `Error Get New Access Token : ${error.response.data}`))

            }
        } else {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}
