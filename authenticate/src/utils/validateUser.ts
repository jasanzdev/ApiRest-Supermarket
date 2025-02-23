import { UserModel } from "../models/users";

export const ValidateEmailExist = async (email: string) => {
    const user = await UserModel.findByEmail(email)
    return !user
}
export const ValidateUsernameExist = async (username: string) => {
    const user = await UserModel.findByUsername(username)
    return !user
}




