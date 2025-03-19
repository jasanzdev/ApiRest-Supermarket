import { User } from '../../src/types/types'

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export { }