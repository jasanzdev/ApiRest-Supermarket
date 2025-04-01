import 'dotenv/config'
import joi from 'joi'

interface EnvVars {
    AUTH_PORT: number
    JWT_ACCESS_SECRET_KEY: string
    JWT_REFRESH_SECRET_KEY: string
    REDIS_URL: string
    POSTGRES_URL: string
    MONGO_URL: string
    NODE_ENV: string
}
const envsSchema = joi.object({
    AUTH_PORT: joi.string().required(),
    JWT_ACCESS_SECRET_KEY: joi.string().required(),
    JWT_REFRESH_SECRET_KEY: joi.string().required(),
    REDIS_URL: joi.string().required(),
    POSTGRES_URL: joi.string().required(),
    MONGO_URL: joi.string().required(),
    NODE_ENV: joi.string().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.AUTH_PORT,
    redisUrl: envVars.REDIS_URL,
    postgresUrl: envVars.POSTGRES_URL,
    isProduction: envVars.NODE_ENV === 'Production',
    accessSecretKey: envVars.JWT_ACCESS_SECRET_KEY,
    refreshSecretKey: envVars.JWT_REFRESH_SECRET_KEY,
    mongoUrl: envVars.MONGO_URL
}