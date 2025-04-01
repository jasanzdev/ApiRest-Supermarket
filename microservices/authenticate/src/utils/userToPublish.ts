import { User } from '../types/types.d'

/**
 * Utility function to transform a user object into a public-facing format, excluding the password.
 * @param {User | User[]} user - The user or array of users to transform.
 * @returns {Omit<User, 'password'> | Omit<User, 'password'>[]} The transformed user(s).
 */
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