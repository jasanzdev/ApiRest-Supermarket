import { SessionModel } from '../models/sessions'
import axios from 'axios'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { userServiceUrl } from '../constants/axios'
import { PublicUser } from '../types/publicUser'
import { User } from '../dto/user'
import { toPublishUser } from '../utils/userToPublish'

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

const RegisterService = async (input: User, userAgent: string) => {
    const response = await axios.post(userServiceUrl, input)

    const user: User = response.data.user

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

const LogoutService = async (refreshToken: string) => {
    if (refreshToken) {
        const { sessionId } = verifyRefreshToken(refreshToken)
        await SessionModel.delete(sessionId)
    }
}

export { LoginService, RegisterService, LogoutService }

