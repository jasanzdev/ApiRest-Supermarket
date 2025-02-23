import { verifyAccessToken } from '../config/jwt';
import { UserModel } from '../models/users';
import { Request, Response } from "express";
import { OK, UNAUTHORIZED } from '../constants/http';
import CatchErrors from '../utils/catchErrors';

export const ValidateToken = CatchErrors(async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token

    const { userId } = verifyAccessToken(accessToken)
    const user = await UserModel.findById(userId)

    if (!user) {
        res.status(UNAUTHORIZED).json({ user: null })
        return
    }

    res.status(OK).json({ user: UserModel.toPublish(user) })
})

