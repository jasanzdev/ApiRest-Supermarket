import config from '../config/config'

export const ProductsUrl = config.node_env.development
    ? 'http://localhost:4001/'
    : 'http://products:4001/'