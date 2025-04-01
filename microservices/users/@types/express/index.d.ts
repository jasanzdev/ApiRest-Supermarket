import { User } from '../../src/types/types.d'

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export { }