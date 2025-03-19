import config from '../config/config'

export const userServiceUrl = config.node_env.development
    ? 'http://localhost:4002/'
    : 'http://users:4002/'