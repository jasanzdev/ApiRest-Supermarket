import { db } from "../config/postgres";
import { Sessions } from "../types/session";
import { User } from "../types/user"

interface SessionProps {
    id: User['id'],
    userAgent: string,
}

export class SessionModel {

    static async create(data: SessionProps) {
        const { id, userAgent } = data
        const session = await db.query(`INSERT INTO session (user_id, user_agent) 
                VALUES ($1, $2)
                ON CONFLICT(user_id,user_agent) DO NOTHING 
                RETURNING *`, [id, userAgent])

        return session.rows[0] as Sessions
    }

    static async getById(id: Sessions['id']) {
        const result = await db.query(
            `SELECT * FROM session WHERE session.id = $1`, [id])

        return result.rowCount ? result.rows[0] : null
    }

    static async getBy(id: User['id'], userAgent: string) {
        const result = await db.query(`SELECT * FROM sessions 
            WHERE sessions.user_id = $1 AND sessions.user_agent = $2`, [id, userAgent])

        return result.rowCount ? result.rows[0] : null
    }

    static async delete(id: Sessions['id']) {
        return await db.query(`DELETE FROM session WHERE session.id = $1`, [id])
    }
}
