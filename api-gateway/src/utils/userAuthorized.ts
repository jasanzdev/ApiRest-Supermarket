import { ClientRequest } from 'http'
import { User } from '../types/user'
import { Response } from 'express'
import logger from './logger'

export const ProductsAuthorized = (user: User, proxyReq: ClientRequest, res: Response) => {
    if (user.role === 'USER') {
        logger.error('Access not authorized to products', {
            username: user.username,
            role: user.role,
            rolePermitted: 'ADMIN | MANAGER | SUPERVISOR'
        })
        res.status(401).json({
            'error': 'Forbidden',
            'message': 'You do not have the required privileges to perform this action.'
        })
        proxyReq.destroy()
    }
}

export const ManageUserAuthorized = (user: User, proxyReq: ClientRequest, res: Response) => {
    if (!(user.role === 'ADMIN' || user.role === 'MANAGER')) {
        logger.error('Access not authorized to users', {
            username: user.username,
            role: user.role,
            rolePermitted: 'ADMIN | MANAGER'
        })
        res.status(401).json({
            'error': 'Forbidden',
            'message': 'You do not have the required privileges to perform this action.'
        })
        proxyReq.destroy()
    }
}

