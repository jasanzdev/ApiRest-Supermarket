import { envs } from '../config/config'

export const ProductsUrl = !envs.isProduction
    ? 'http://localhost:4001/'
    : 'http://products:4001/'