import { PublishUser, User } from "../types/user"
import { SessionModel } from "../models/sessions"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../config/jwt"
import { UserModel } from "../models/users"

const LoginService = async (user: PublishUser, userAgent: string) => {

    const dataSession = {
        id: user?.id,
        userAgent: userAgent,
    }

    const session = await SessionModel.create(dataSession)

    const accessPayload = {
        userId: user?.id,
        sessionId: session.user_id
    }

    const refreshPayload = {
        sessionId: session.user_id
    }

    const accessToken = generateAccessToken(accessPayload)
    const refreshToken = generateRefreshToken(refreshPayload)

    return { accessToken, refreshToken }
}

const RegisterService = async (input: User, userAgent: string) => {
    const user: User = await UserModel.create(input)

    const dataSession = {
        id: user.id,
        userAgent: userAgent
    }

    const session = await SessionModel.create(dataSession)

    const accessPayload = {
        userId: user.id,
        sessionId: session.user_id
    }

    const refreshPayload = {
        sessionId: session.user_id
    }

    const accessToken = generateAccessToken(accessPayload)
    const refreshToken = generateRefreshToken(refreshPayload)
    const publicUser = UserModel.toPublish(user)

    return { publicUser, accessToken, refreshToken };
}

const LogoutService = async (refreshToken: string) => {
    if (refreshToken) {
        const { sessionId } = verifyRefreshToken(refreshToken)
        await SessionModel.delete(sessionId)
    }
}

export { LoginService, RegisterService, LogoutService }

