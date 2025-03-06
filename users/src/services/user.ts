import { SuperAdmin } from '../constants/adminUser'
import { CONFLICT } from '../constants/http'
import { User, UserToUpdate } from '../dto/user'
import UserModel from '../models/users'
import appAssert from '../utils/appAssert'

export default class UserServices {
    static readonly getAll = async () => {
        const users = await UserModel.findAll()
        return users
    }

    static readonly getById = async (id: User['id']) => {
        const user = await UserModel.findById(id)
        return !user ? null : user
    }

    static readonly getByUsernameOrEmail = async (usernameOrEmail: string) => {
        const user = await UserModel.findBy(usernameOrEmail)
        return !user ? null : user
    }

    static readonly create = async (input: User) => {
        const user = await UserModel.create(input)
        return user
    }

    static readonly update = async (id: User['id'], input: User) => {
        const { name, email, password, role } = input

        const user: UserToUpdate = {}
        if (name) user.name = name
        if (email) user.email = email
        if (password) user.password = password
        if (role) user.role = role

        const updatedUser = await UserModel.update(id, user)

        return !updatedUser ? null : updatedUser
    }

    static readonly delete = async (id: User['id']) => {
        const user = await UserModel.findById(id) as User
        console.log(user.username, SuperAdmin.username)

        appAssert(
            user.username !== SuperAdmin.username,
            CONFLICT,
            'impossible to delete de Super Admin user'
        )

        return await UserModel.delete(id)
    }
}
