import { Router } from "express";
import { AuthenticationController } from "../controllers/authentication"
import { ValidateLogin } from "../middleware/validateLogin"
import { ValidateToken } from "../controllers/validateToken";
import { RefreshToken } from "../controllers/refreshToken";

export const CreateAuthRouter = () => {
    const router = Router()

    router.post('/login', ValidateLogin, AuthenticationController.login)
    router.post('/register', AuthenticationController.register)
    router.post('/logout', AuthenticationController.logout)
    router.get('/verify-token', ValidateToken)
    router.get('/refresh-token', RefreshToken)

    return router
}
