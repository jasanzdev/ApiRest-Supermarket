import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'
import CatchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import { BAD_REQUEST, UNPROCESSABLE_CONTENT } from "../constants/http";
import { User } from "../types/user";
import { UserModel } from "../models/users";
import AppErrorCode from "../constants/appErrorCode";

export const ValidateLogin: RequestHandler = CatchErrors(async (req, res, next) => {
    const { username, password } = req.body

    appAssert(
        username && password,
        BAD_REQUEST,
        'The username && password is require',
        AppErrorCode.BadRequest
    )

    const user: User = await UserModel.findByUsername(username)

    appAssert(
        user,
        UNPROCESSABLE_CONTENT,
        'Invalid username or password',
        AppErrorCode.BadRequest
    )

    const isValid = await bcrypt.compare(password, user.password)

    appAssert(
        isValid,
        UNPROCESSABLE_CONTENT,
        'Invalid username or password',
        AppErrorCode.BadRequest
    )

    req.user = UserModel.toPublish(user)

    next()
})
