import { User } from '../dto/user'

export const toPublishUser = (user: User | User[]) => {
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