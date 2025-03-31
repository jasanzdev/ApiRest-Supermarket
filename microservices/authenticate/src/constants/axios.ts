import { envs } from '../config/config'

export const userServiceUrl = !envs.isProduction
    ? 'http://localhost:4002/'
    : 'http://users:4002/'