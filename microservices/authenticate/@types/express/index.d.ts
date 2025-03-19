import { PublicUser } from '../../src/types/types.d'

declare global {
    namespace Express {
        interface Request {
            user?: PublicUser
        }
    }
}

export { }