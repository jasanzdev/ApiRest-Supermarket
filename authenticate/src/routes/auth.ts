import { Router } from 'express'
import { AuthenticationController } from '../controllers/authentication'
import { ValidateLogin } from '../middleware/validateLogin'
import ValidateTokensController from '../controllers/verifyTokens'

export const CreateAuthRouter = () => {
    const router = Router()

    router.post('/login', ValidateLogin, AuthenticationController.login)
    router.post('/register', AuthenticationController.register)
    router.post('/logout', AuthenticationController.logout)
    router.post('/verify-token', ValidateTokensController.VerifyToken)
    router.post('/refresh-token', ValidateTokensController.RefreshToken)

    return router
}
