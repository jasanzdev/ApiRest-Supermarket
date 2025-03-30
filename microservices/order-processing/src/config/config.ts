import 'dotenv/config'
import joi from 'joi'

interface EnvVars {
    ORDER_PROCESSING_PORT: number
    REDIS_URL: string
    MONGO_URL: string
    NODE_ENV: string
}
const envsSchema = joi.object({
    ORDER_PROCESSING_PORT: joi.number().required(),
    REDIS_URL: joi.string().required(),
    MONGO_URL: joi.string().required(),
    NODE_ENV: joi.string().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.ORDER_PROCESSING_PORT,
    redisUrl: envVars.REDIS_URL,
    mongoUrl: envVars.MONGO_URL,
    node_env: envVars.NODE_ENV === 'Development'
}