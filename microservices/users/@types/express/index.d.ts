import { User } from '../../src/dto/user'

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export { }