import { PublishUser } from "../../src/types/publicUser"

declare global {
    namespace Express {
        interface Request {
            user?: PublishUser
        }
    }
}

export { }