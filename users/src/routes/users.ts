import { Router } from 'express'
import UserController from '../controllers/users'
import { checkSchema } from 'express-validator'
import { validateRequest } from '../middlewares/validateRequest'
import { CreateSchema } from '../schema/createUser'
import { UpdateSchema } from '../schema/updateUser'

export const CreateUsersRouter = () => {
    const router = Router()

    router.get('/', UserController.getUsers)
    router.get('/usernameOrEmail/:value', UserController.getUserByUsernameOrEmail)
    router.get('/:id', UserController.getUserById)
    router.post('/', checkSchema(CreateSchema), validateRequest, UserController.createUser)
    router.patch('/:id', checkSchema(UpdateSchema), validateRequest, UserController.updateUser)
    router.delete('/:id', UserController.deleteUser)

    return router
}
