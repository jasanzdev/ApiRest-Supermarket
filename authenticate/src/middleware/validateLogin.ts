import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'
import CatchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import { BAD_REQUEST } from "../constants/http";
import { User } from "../types/user";
import { UserModel } from "../models/users";

export const ValidateLogin: RequestHandler = CatchErrors(async (req, res, next) => {
    const { username, password } = req.body

    appAssert(
        username && password,
        BAD_REQUEST,
        'The username && password is require'
    )

    const user: User = await UserModel.findByUsername(username)
    appAssert(
        user,
        BAD_REQUEST,
        'Invalid username or password'
    )

    const isValid = await bcrypt.compare(password, user.password)

    appAssert(
        isValid,
        BAD_REQUEST,
        'Invalid username or password'
    )

    req.user = UserModel.toPublish(user)

    next()
})
