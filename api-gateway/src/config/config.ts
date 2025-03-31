import 'dotenv/config'
import joi from 'joi'

interface EnvVars {
    GATEWAY_PORT: number
    REDIS_URL: string
    NODE_ENV: string
}
const envsSchema = joi.object({
    GATEWAY_PORT: joi.number().required(),
    REDIS_URL: joi.string().required(),
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.GATEWAY_PORT,
    redisUrl: envVars.REDIS_URL,
    isProduction: envVars.NODE_ENV === 'Production',
}