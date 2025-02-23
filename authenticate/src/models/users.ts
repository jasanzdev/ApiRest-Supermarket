import { db } from "../config/postgres";
import bcrypt from 'bcrypt'
import { PublishUser, User } from "../types/user";

const salt = Number(process.env.SALT_ROUNDS) || 10

export class UserModel {

    static async create(input: User) {
        const { name, username, password, email, role } = input
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await db.query(`INSERT INTO users (name, username, email, password, role)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, username, email, hashPassword, role])

        return user.rows[0]
    }
    static async findById(id: User['id']) {
        const result = await db.query(`SELECT * FROM users WHERE users.id = $1`, [id])
        return result.rowCount ? result.rows[0] : null
    }

    static async findByUsername(username: string) {
        const result = await db.query(`SELECT * FROM users WHERE users.username = $1`, [username])
        return result.rowCount ? result.rows[0] : null
    }

    static async findByEmail(email: string) {
        const result = await db.query(`SELECT * FROM users WHERE users.email = $1`, [email])
        return result.rowCount ? result.rows[0] : null
    }

    static toPublish(user: User): PublishUser {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user
        return rest
    }
}