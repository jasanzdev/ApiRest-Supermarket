import { Router } from 'express'
import UserController from '../controllers/userController'
import { checkSchema } from 'express-validator'
import { validateRequest } from '../middlewares/validateRequest'
import { CreateSchema } from '../schema/createUserBody'
import { UpdateSchema } from '../schema/updateUserBody'
import { ResetPassword } from '../schema/resetPasswordBody'

export const CreateUsersRouter = () => {
    const router = Router()

    router.get('/', UserController.getUsers)

    router.get('/usernameOrEmail/:value',
        UserController.getUserByUsernameOrEmail)

    router.get('/:id',
        UserController.getUserById)

    router.post('/',
        checkSchema(CreateSchema),
        validateRequest,
        UserController.createUser)

    router.patch('/:id',
        checkSchema(UpdateSchema),
        validateRequest,
        UserController.updateUser)

    router.patch('/resetPassword/:id',
        checkSchema(ResetPassword),
        validateRequest,
        UserController.resetPassword)

    router.delete('/:id',
        UserController.deleteUser)

    return router
}
