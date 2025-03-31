import 'dotenv/config'
import joi from 'joi'

interface EnvVars {
    USER_PORT: number
    POSTGRES_URL: string
    REDIS_URL: string,
    ADMIN_PASS: string,
    SALT_ROUNDS: number,
    NODE_ENV: string
}
const envsSchema = joi.object({
    USER_PORT: joi.string().required(),
    REDIS_URL: joi.string().required(),
    ADMIN_PASS: joi.string().required(),
    POSTGRES_URL: joi.string().required(),
    SALT_ROUNDS: joi.number().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.USER_PORT,
    redisUrl: envVars.REDIS_URL,
    postgresUrl: envVars.POSTGRES_URL,
    isProduction: envVars.NODE_ENV === 'Production',
    adminPass: envVars.ADMIN_PASS,
    salt: envVars.SALT_ROUNDS
}