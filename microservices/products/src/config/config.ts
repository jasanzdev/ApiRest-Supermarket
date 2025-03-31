import 'dotenv/config'
import joi from 'joi'

interface EnvVars {
    PRODUCTS_PORT: number
    REDIS_URL: string
    POSTGRES_URL: string
    NODE_ENV: string
}

const envsSchema = joi.object({
    PRODUCTS_PORT: joi.string().required(),
    REDIS_URL: joi.string().required(),
    POSTGRES_URL: joi.string().required(),
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.PRODUCTS_PORT,
    redisUrl: envVars.REDIS_URL,
    postgresUrl: envVars.POSTGRES_URL,
    isProduction: envVars.NODE_ENV === 'Production',
}