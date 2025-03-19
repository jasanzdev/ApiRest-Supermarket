import redisClient from '../utils/redisClient'

export const StoreDataInCache = async (body: Buffer[], url: string, method: string): Promise<string> => {
    const responseBody = Buffer.concat(body).toString()
<<<<<<< HEAD
    if (method === 'GET') {
        const cacheKey = url.endsWith('/') ? url.slice(0, -1) : url
        await redisClient.set(cacheKey, responseBody, { 'EX': 3600 })
    }
=======
    // if (method === 'GET') {
    //     const cacheKey = url.endsWith('/') ? url.slice(0, -1) : url
    //     await redisClient.set(cacheKey, responseBody, { 'EX': 3600 })
    // }
>>>>>>> 117f445b7de3f928fef095a9bc6e01a19aea0ffd
    return responseBody
}
