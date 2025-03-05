import { SuperAdmin } from '../constants/adminUser'
import { CONFLICT } from '../constants/http'
import { User, UserToUpdate } from '../dto/user'
import UserModel from '../models/users'
import appAssert from '../utils/appAssert'

export default class UserServices {
    static readonly getAll = async () => {
        const users = await UserModel.findAll()
        return this.toPublishUser(users)
    }

    static readonly getById = async (id: User['id']) => {
        const user = await UserModel.findById(id)
        return !user ? null : this.toPublishUser(user)
    }

    static readonly create = async (input: User) => {
        const user = await UserModel.create(input)
        return this.toPublishUser(user)
    }

    static readonly update = async (id: User['id'], input: User) => {
        const { name, email, password, role } = input

        const user: UserToUpdate = {}
        if (name) user.name = name
        if (email) user.email = email
        if (password) user.password = password
        if (role) user.role = role

        const updatedUser = await UserModel.update(id, user)

        return !updatedUser ? null : this.toPublishUser(updatedUser)
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

    static readonly toPublishUser = (user: User | User[]) => {
        if (Array.isArray(user)) {
            const publicUsers: Omit<User, 'password'>[] = user.map(user => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...rest } = user
                return rest
            })
            return publicUsers
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user
        return rest
    }
};
