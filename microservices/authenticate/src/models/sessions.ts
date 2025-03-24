import { db } from '../config/postgres'
import { PublicUser, Sessions } from '../types/types.d'

interface SessionProps {
    userId: PublicUser['id'],
    userAgent: string,
}

export class SessionModel {

    static async create(data: SessionProps) {
        const { userId, userAgent } = data
        const session = await db.query(`INSERT INTO session (user_id, user_agent) 
                VALUES ($1, $2)
                ON CONFLICT(user_id,user_agent)
                DO UPDATE SET updated_at = CURRENT_TIMESTAMP 
                RETURNING *`, [userId, userAgent])

        return session.rows[0] as Sessions
    }

    /**
     * Retrieves a session by ID from the database.
     * @param {Sessions['id']} id - The ID of the session to retrieve.
     * @returns {Promise<Sessions | null>} The session data or null if not found.
     */
    static async getById(id: Sessions['id']) {
        const result = await db.query(
            'SELECT * FROM session WHERE session.id = $1', [id])

        return result.rowCount ? result.rows[0] : null
    }

    static async getBy(id: PublicUser['id'], userAgent: string) {
        const result = await db.query(`SELECT * FROM sessions 
            WHERE sessions.user_id = $1 AND sessions.user_agent = $2`, [id, userAgent])

        return result.rowCount ? result.rows[0] : null
    }

    /**
     * Deletes a session from the database by session ID.
     * @param {Sessions['id']} id - The ID of the session to delete.
     * @returns {Promise<void>}
     */
    static async delete(id: Sessions['id']) {
        return await db.query('DELETE FROM session WHERE session.id = $1', [id])
    }
}
