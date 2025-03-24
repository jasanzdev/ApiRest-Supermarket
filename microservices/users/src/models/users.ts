import { User, UserToUpdate } from '../dto/user'
import { db } from '../config/postgres'
import bcrypt from 'bcryptjs'
import config from '../config/config'

export default class UserModel {

    static readonly findAll = async () => {
        const result = await db.query('SELECT * FROM users ORDER BY updated_at DESC')
        return result.rows
    }

    static async findById(id: User['id']) {
        const result = await db.query('SELECT * FROM users WHERE users.id = $1', [id])
        return result.rowCount ? result.rows[0] : null
    }

    static async findBy(usernameOrEmail: string) {
        const result = await db.query(
            `SELECT * FROM users u
            WHERE u.username = $1 OR u.email = $1`,
            [usernameOrEmail])

        return result.rowCount ? result.rows[0] : null
    }

    static async create(input: User) {
        const { name, username, password, email, role } = input
        const hashPassword = await bcrypt.hash(password, config.salt.salt)
        const user = await db.query(`INSERT INTO users (name, username, email, password, role)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, username, email, hashPassword, role])

        return user.rows[0]
    }

    static readonly update = async (id: User['id'], user: UserToUpdate) => {
        const userWithUpdatedAt = {
            ...user,
            updated_at: new Date()
        }
        const update = Object.keys(userWithUpdatedAt).map((key, index) => `${key}=$${index + 2}`).join(', ')
        const values = Object.values(userWithUpdatedAt)

        const result = await db.query(`
            UPDATE users SET ${update} WHERE users.id=$1 RETURNING *`,
            [id, ...values])

        return result.rowCount ? result.rows[0] : null
    }

    static readonly delete = async (id: User['id']) => {
        const result = await db.query('DELETE FROM users WHERE users.id=$1', [id])
        return result.rowCount === 1
    }
}
