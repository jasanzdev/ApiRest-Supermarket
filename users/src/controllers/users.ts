import { Request, RequestHandler, Response } from 'express'
import CatchErrors from '../utils/catchError'
import UserServices from '../services/user'
import { validate as uuidValidate } from 'uuid'
import appAssert from '../utils/appAssert'
import { CREATED, NO_CONTENT, NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import { User } from '../dto/user'

export default class UserController {

    static readonly getUsers: RequestHandler = CatchErrors(async (req, res) => {
        const users = await UserServices.getAll() as User[]
        const count = users.length
        res.status(OK).json(
            {
                total: count,
                users: users
            })
    })

    static readonly getUserById: RequestHandler = CatchErrors(async (req, res) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            UNPROCESSABLE_CONTENT,
            'Invalid Id',
            AppErrorCode.InvalidId
        )

        const user = await UserServices.getById(id)
        res.status(!user ? NOT_FOUND : OK).json(
            !user
                ? { success: false, message: 'User not found', user: null }
                : { success: true, message: 'User founded successfully', user: user })
    })

    static readonly createUser = CatchErrors(async (req: Request, res: Response) => {
        const user = await UserServices.create(req.body)
        res.status(CREATED).json({
            success: true,
            message: 'User Created successfully',
            user: user
        })
    })

    static readonly updateUser: RequestHandler = CatchErrors(async (req, res) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            UNPROCESSABLE_CONTENT,
            'Invalid Id',
            AppErrorCode.InvalidId
        )

        const user = await UserServices.update(id, req.body)

        res.status(user ? OK : NOT_FOUND).json(!user
            ? {
                success: false,
                message: 'impossible update, user not found',
                user: null
            }
            : {
                success: true,
                message: 'User updated successfully',
                user: user
            })
    })

    static readonly deleteUser: RequestHandler = CatchErrors(async (req, res) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            UNPROCESSABLE_CONTENT,
            'Invalid Id',
            AppErrorCode.InvalidId
        )

        const deleted = await UserServices.delete(id)

        res.status(deleted ? NO_CONTENT : NOT_FOUND).json({
            success: false,
            message: 'Impossible to delete, user not exists'
        })
    })
}
