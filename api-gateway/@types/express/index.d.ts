import { PublishUser } from "../../src/types/user"

declare global {
    namespace Express {
        interface Request {
            user?: PublishUser
        }
    }
}

export { }