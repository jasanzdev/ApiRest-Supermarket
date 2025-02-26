import { PublishUser, User } from "../types/user"
import { SessionModel } from "../models/sessions"
import { UserModel } from "../models/users"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt"

const LoginService = async (user: PublishUser, userAgent: string) => {

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
    const user: User = await UserModel.create(input)

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
    const publicUser = UserModel.toPublish(user)

    return { publicUser, accessToken, refreshToken }
}

const LogoutService = async (refreshToken: string) => {
    if (refreshToken) {
        const { sessionId } = verifyRefreshToken(refreshToken)
        await SessionModel.delete(sessionId)
    }
}

export { LoginService, RegisterService, LogoutService }

