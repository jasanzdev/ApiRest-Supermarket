import { SessionModel } from '../models/sessions'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { User } from '../dto/user'
import { toPublishUser } from '../utils/userToPublish'
import { PublicUser } from '../types/types.d'
import { RegisterUser } from '../utils/fetchUserAxios'

const LoginService = async (user: PublicUser, userAgent: string) => {

    const dataSession = {
        userId: user.id,
        userAgent: userAgent,
    }

    const session = await SessionModel.create(dataSession)

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

const RegisterService = async (input: User, userAgent: string, receiveSecretKey: string) => {
    const user: User = await RegisterUser(input, receiveSecretKey)

    const dataSession = {
        userId: user.id,
        userAgent: userAgent,
    }

    const session = await SessionModel.create(dataSession)

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

/**
 * Service function to invalidate a user's session based on the refresh token.
 * @param {string} refreshToken - The refresh token from the request cookie.
 * @returns {Promise<void>}
 */
const LogoutService = async (refreshToken: string) => {
    if (refreshToken) {
        const { sessionId } = verifyRefreshToken(refreshToken)
        await SessionModel.delete(sessionId)
    }
}

export { LoginService, RegisterService, LogoutService }

