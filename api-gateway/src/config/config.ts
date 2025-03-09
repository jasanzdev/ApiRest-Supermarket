export const config = {
    server: {
        port: process.env.GATEWAY_PORT ?? 3000
    },
    redis: {
        url: process.env.REDIS_URL ?? 'redis://localhost:6379'
    }
}