import { RequestHandler } from 'express';
import CatchErrors from "../utils/catchErrors";
import { UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";
import AppErrorCode from '../constants/appErrorCode';
import { UserModel } from '../models/users';
import { verifyAccessToken } from '../utils/jwt';

export const Authenticate: RequestHandler = CatchErrors(async (req, res, next) => {
    const accessToken = req.headers['authorization']

    appAssert(
        accessToken,
        UNAUTHORIZED,
        'Access denied, access token not provider',
        AppErrorCode.InvalidToken
    )

    const { userId } = verifyAccessToken(accessToken)
    const user = await UserModel.findById(userId)

    appAssert(
        user,
        UNAUTHORIZED,
        'Access denied, User not found',
        AppErrorCode.UserNotExist
    )

    req.user = UserModel.toPublish(user)
    next()
})

