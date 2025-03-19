import config from '../config/config'

export const refreshTokenUrl = !config.node_env.development
    ? 'http://authenticate:4000/refresh-token'
    : 'http://localhost:4000/refresh-token'

export const verifyTokenUrl = !config.node_env.development
    ? 'http://authenticate:4000/verify-token'
    : 'http://localhost:4000/verify-token'

export const authUrl = !config.node_env.development
    ? 'http://authenticate:4000/'
    : 'http://localhost:4000/'

export const productsUrl = !config.node_env.development
    ? 'http://products:4001/'
    : 'http://localhost:4001/'

export const usersUrl = !config.node_env.development
    ? 'http://users:4002/'
    : 'http://localhost:4002/'

<<<<<<< HEAD
export const purchaseUrl = !config.node_env.development
    ? 'http://order-processing:4003/'
=======
export const purchaseUrl = process.env.NODE_ENV === 'production'
    ? 'http://purchase:4003/'
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd
    : 'http://localhost:4003/'