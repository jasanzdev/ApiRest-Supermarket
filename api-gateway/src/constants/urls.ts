export const refreshTokenUrl = process.env.NODE_ENV === 'production'
    ? 'http://authentication:4000/refresh-token'
    : 'http://localhost:4000/refresh-token'

export const verifyTokenUrl = process.env.NODE_ENV === 'production'
    ? 'http://authentication:4000/verify-token'
    : 'http://localhost:4000/verify-token'

export const authUrl = process.env.NODE_ENV === 'production'
    ? 'http://authentication:4000/'
    : 'http://localhost:4000/'

export const productsUrl = process.env.NODE_ENV === 'production'
    ? 'http://products:4001/'
    : 'http://localhost:4001/'

export const usersUrl = process.env.NODE_ENV === 'production'
    ? 'http://users:4002/'
    : 'http://localhost:4002/'

export const purchaseUrl = process.env.NODE_ENV === 'production'
    ? 'http://purchase:4003/'
    : 'http://localhost:4003/'