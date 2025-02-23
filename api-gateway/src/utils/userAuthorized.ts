import { ClientRequest } from "http";
import { User } from "../types/user";
import { Response } from "express";

export const AuthorizedUser = (user: User, proxyReq: ClientRequest, res: Response) => {
    if (user && (user.role === 'ADMIN' || user.role === 'SUPERVISOR')) {
        proxyReq.end()
    } else {
        res.status(401).json({
            "error": "Forbidden",
            "message": "You do not have the required privileges to perform this action."
        })
    }
}