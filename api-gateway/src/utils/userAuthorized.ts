import { ClientRequest } from 'http'
import { Request, Response } from 'express'
import logger from './logger'
import { User } from '../types/types.d'

export const UserAuthorized = (proxyReq: ClientRequest, req: Request, res: Response) => {
    const user = req.user as User
    const unauthorizedResponse = (message: string, rolePermitted: string) => {
        logger.error(message, { username: user.username, role: user.role, rolePermitted })
        res.status(401).json({ error: 'Forbidden', message })
        proxyReq.destroy()
    }

    const rolePermissions: Record<string, string[]> = {
        products: ['ADMIN', 'MANAGER', 'SUPERVISOR'],
        users: ['ADMIN', 'MANAGER'],
        cart: ['USER'],
        orders: ['USER']
    }
    const url = req.baseUrl.split('/')[1]
    const requiredRoles = rolePermissions[url]

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        const errorMessages: Record<string, string> = {
            products: 'Access not authorized to products',
            users: 'Access not authorized to users',
            cart: 'Only registered users can make online purchases.Please log in or create an account to proceed.',
            orders: 'Only registered users can make online purchases.Please log in or create an account to proceed.'
        }

        unauthorizedResponse(errorMessages[url], requiredRoles.join(' | '))
    }
}
