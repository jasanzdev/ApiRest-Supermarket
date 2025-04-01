import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { toPublishUser } from '../utils/userToPublish'
import { PublicUser, User } from '../types/types.d'
import { RegisterUser } from '../utils/fetchUserAxios'
import { SessionRepository } from '../repositories/session'

export class AuthService {

    constructor(private readonly sessionRepository: SessionRepository) { }

    loginService = async (user: PublicUser, userAgent: string) => {

        const dataSession = {
            userId: user.id,
            userAgent: userAgent,
        }

        const session = await this.sessionRepository.create(dataSession)

        const accessPayload = {
            userId: user.id,
            sessionId: session.id
        }

        const refreshPayload = {
            sessionId: session.id
        }

        const accessToken = generateAccessToken(accessPayload)
        const refreshToken = generateRefreshToken(refreshPayload)

        return { accessToken, refreshToken }
    }

    registerService = async (input: User, userAgent: string, receiveSecretKey: string) => {
        const user: User = await RegisterUser(input, receiveSecretKey)

        const dataSession = {
            userId: user.id,
            userAgent: userAgent,
        }

        const session = await this.sessionRepository.create(dataSession)

        const accessPayload = {
            userId: user.id,
            sessionId: session.id
        }

        const refreshPayload = {
            sessionId: session.id
        }

        const accessToken = generateAccessToken(accessPayload)
        const refreshToken = generateRefreshToken(refreshPayload)
        const publicUser = toPublishUser(user)

        return { publicUser, accessToken, refreshToken }
    }

    logoutService = async (refreshToken: string) => {
        if (refreshToken) {
            const { sessionId } = verifyRefreshToken(refreshToken)
            await this.sessionRepository.delete(sessionId)
        }
    }
}

