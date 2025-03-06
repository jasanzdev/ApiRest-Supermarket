import { ClientRequest } from "http";
import { User } from "../types/user";
import { Response } from "express";

export const ProductsAuthorized = (user: User, proxyReq: ClientRequest, res: Response) => {
    if (user.role === 'USER') {
        res.status(401).json({
            "error": "Forbidden",
            "message": "You do not have the required privileges to perform this action."
        })
        proxyReq.destroy()
    }
}

export const ManageUserAuthorized = (user: User, proxyReq: ClientRequest, res: Response) => {
    if (!(user.role === 'ADMIN' || user.role === 'MANAGER')) {
        res.status(401).json({
            "error": "Forbidden",
            "message": "You do not have the required privileges to perform this action."
        })
        proxyReq.destroy()
    }
}

