import { RequestHandler } from 'express';
import CatchErrors from "../utils/catchErrors";
import { NOT_FOUND, UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";
import AppErrorCode from '../constants/appErrorCode';
import { verifyAccessToken } from '../config/jwt';
import { UserModel } from '../models/users';

export const Authenticate: RequestHandler = CatchErrors(async (req, res, next) => {
    const accessToken = req.cookies.access_token

    appAssert(
        accessToken,
        UNAUTHORIZED,
        'Access not authorized',
        AppErrorCode.InvalidToken
    )

    const { userId } = verifyAccessToken(accessToken)
    const user = await UserModel.findById(userId)
    appAssert(
        user,
        NOT_FOUND,
        'User not found',
        AppErrorCode.UserNotExist
    )
    req.user = UserModel.toPublish(user)
    next()
})

