import { RequestHandler } from 'express'
import CatchErrors from '../utils/catchErrors'
import { User } from '../types/types'
import appAssert from '../utils/appAssert'
import { UNAUTHORIZED } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'

export const AuthorizeUserRole: RequestHandler = CatchErrors(async (req, _res, next) => {
    const userHeader = req.headers['x-user']
    const user: User = typeof userHeader === 'string' ? JSON.parse(userHeader) : undefined

    if (req.url.includes('inventory')) {
        appAssert(
            user,
            UNAUTHORIZED,
            'Authentication is required to perform this action.',
            AppErrorCode.AccessDenied
        )

        req.user = user
        next()
        return
    }

    if (req.method !== 'GET') {
        appAssert(
            user && user.role !== 'USER',
            UNAUTHORIZED,
            'Access denied. You must be authenticated and have the appropriate role to perform this action.',
            AppErrorCode.AccessDenied
        )
    }

    next()
})
