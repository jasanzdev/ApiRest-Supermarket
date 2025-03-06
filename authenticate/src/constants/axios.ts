export const userServiceUrl = process.env.NODE_ENV === 'production'
    ? 'http://users:4002/'
    : 'http://localhost:4002/'