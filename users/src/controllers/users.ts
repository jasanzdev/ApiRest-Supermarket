import { Request, RequestHandler, Response } from 'express'
import CatchErrors from '../utils/catchError'
import UserServices from '../services/user'
import { validate as uuidValidate } from 'uuid'
import appAssert from '../utils/appAssert'
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK, UNPROCESSABLE_CONTENT } from '../constants/http'
import AppErrorCode from '../constants/appErrorCode'
import { User } from '../dto/user'
import logger from '../utils/logger'

export default class UserController {

    static readonly getUsers: RequestHandler = CatchErrors(async (req, res) => {
        logger.log('info', `Fetching Users: ${req.url}`)
        const users = await UserServices.getAll() as User[]
        const count = users.length
        res.status(OK).json(
            {
                total: count,
                users: users
            })
    })

    static readonly getUserById: RequestHandler = CatchErrors(async (req, res) => {
        logger.log('info', `Fetching User by id: ${req.url}`)
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

    static readonly getUserByUsernameOrEmail: RequestHandler = CatchErrors(async (req, res) => {
        logger.log('info', `Fetching User by username or email: ${req.url}`)
        const { value } = req.params

        appAssert(
            value,
            BAD_REQUEST,
            'Username or Email no provider',
            AppErrorCode.BadRequest
        )

        const user = await UserServices.getByUsernameOrEmail(value)
        res.status(!user ? NOT_FOUND : OK).json(!user
            ? { success: false, message: 'User not found', user: null }
            : { success: true, message: 'User founded successfully', user: user })
    })

    static readonly createUser = CatchErrors(async (req: Request, res: Response) => {
        logger.log('info', `Creating User: ${req.url}`)
        const user = await UserServices.create(req.body)
        res.status(CREATED).json({
            success: true,
            message: 'User Created successfully',
            user: user
        })
    })

    static readonly updateUser: RequestHandler = CatchErrors(async (req, res) => {
        const { id } = req.params
        logger.log('info', `Updating User with id:${id}`)

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
        logger.log('info', `Deleting User with id:${id}`)

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

    static readonly resetPassword: RequestHandler = CatchErrors(async (req, res) => {
        const { password, newPassword } = req.body
        const { id } = req.params

        await UserServices.ResetPassword(id, password, newPassword)

        res.status(OK).json({
            success: true,
            message: 'Password reset successfully'
        })
    })
}
