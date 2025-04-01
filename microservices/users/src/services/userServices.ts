import { SuperAdmin } from '../constants/adminUser'
import AppErrorCode from '../constants/appErrorCode'
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http'
import UserModel from '../models/users'
import { User, UserToUpdate } from '../types/types.d'
import appAssert from '../utils/appAssert'
import bcrypt from 'bcryptjs'

export default class UserServices {
    static readonly getAll = async (): Promise<User[]> => {
        const users = await UserModel.findAll()
        return users
    }

    static readonly getById = async (id: User['id']): Promise<User | null> => {
        const user = await UserModel.findById(id)
        return !user ? null : user
    }

    static readonly getByUsernameOrEmail = async (usernameOrEmail: string): Promise<User | null> => {
        const user = await UserModel.findBy(usernameOrEmail)
        return !user ? null : user
    }

    static readonly create = async (input: User): Promise<User> => {
        const user = await UserModel.create(input)
        return user
    }

    static readonly update = async (id: User['id'], input: User): Promise<User | null> => {
        const { name, email, role } = input

        const user: UserToUpdate = {}
        if (name) user.name = name
        if (email) user.email = email
        if (role) user.role = role

        const updatedUser = await UserModel.update(id, user)

        return !updatedUser ? null : updatedUser
    }

    static readonly ResetPassword = async (id: User['id'], password: string, newPassword: string): Promise<boolean> => {
        const user = await UserModel.findById(id) as User
        appAssert(
            user,
            NOT_FOUND,
            'Impossible to reset password, user not found',
            AppErrorCode.UsersNotFound
        )

        const isValidPass = await bcrypt.compare(password, user.password)
        appAssert(
            isValidPass,
            CONFLICT,
            'Passwords do not match.',
            AppErrorCode.InvalidPass
        )

        const userToUpdate: UserToUpdate = {}
        userToUpdate.password = newPassword

        const result = await UserModel.update(id, userToUpdate)

        appAssert(
            result,
            INTERNAL_SERVER_ERROR,
            'Unknown Error occurred while to attempt reset password',
            AppErrorCode.InternalServerError
        )

        return true
    }

    static readonly delete = async (id: User['id']): Promise<boolean> => {
        const user = await UserModel.findById(id)

        appAssert(
            user && user?.username !== SuperAdmin.username,
            CONFLICT,
            'impossible to delete de Super Admin user'
        )

        return await UserModel.delete(id)
    }
}
