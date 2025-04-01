import { SessionModel } from '../models/session'
import { Sessions, User } from '../types/types'

export class SessionRepository {

    async findById(id: Sessions['id']): Promise<Sessions | null> {
        return await SessionModel.findById(id).exec()
    }

    async find(id: User['id'], userAgent: string): Promise<Sessions | null> {
        return await SessionModel.findOne({ userId: id, userAgent: userAgent })
    }

    async create(data: Omit<Sessions, 'id'>): Promise<Sessions> {
        const { userId, userAgent } = data
        const session = await this.find(userId, userAgent)

        if (session) return session

        const newSession = new SessionModel({
            userId,
            userAgent
        })
        return await newSession.save()
    }

    async delete(id: Sessions['id']): Promise<void> {
        await SessionModel.findByIdAndDelete(id)
    }
}