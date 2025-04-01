import { Router } from 'express'
import { AuthenticationController } from '../controllers/authController'
import { ValidateLogin } from '../middleware/validateLogin'
import ValidateTokensController from '../controllers/validateTokensController'
import { SessionRepository } from '../repositories/session'
import { AuthService } from '../services/authServices'

export const CreateAuthRouter = () => {
    const router = Router()

    const sessionRepository = new SessionRepository()
    const authService = new AuthService(sessionRepository)
    const authController = new AuthenticationController(authService)
    const validateToken = new ValidateTokensController()

    router.post('/login', ValidateLogin, authController.login)

    router.post('/register', authController.register)

    router.post('/logout', authController.logout)

    router.post('/verify-token', validateToken.verifyToken)

    router.post('/refresh-token', validateToken.refreshToken)

    return router
}
