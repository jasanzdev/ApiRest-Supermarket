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
        const session = await db.query(`INSERT INTO sessions (user_id, user_agent, expired_at) 
                VALUES ($1, $2, NOW() + INTERVAL '30 days')
                ON CONFLICT(user_id,user_agent) DO UPDATE
                SET expired_at = NOW() + INTERVAL '30 days' 
                RETURNING *`, [id, userAgent])

        return session.rows[0] as Sessions
    }

    static async getBy(id: User['id'], userAgent: string) {
        const result = await db.query(`SELECT * FROM sessions 
            WHERE sessions.user_id = $1 AND sessions.user_agent = $2`, [id, userAgent])

        return result.rowCount ? result.rows[0] : null
    }

    static async delete(id: User['id']) {
        return await db.query(`DELETE FROM sessions WHERE sessions.user_id = $1`, [id])
    }
};
