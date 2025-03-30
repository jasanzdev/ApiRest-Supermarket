import { envs } from '../config/config'

export const ProductsUrl = envs.node_env
    ? 'http://localhost:4001/'
    : 'http://products:4001/'