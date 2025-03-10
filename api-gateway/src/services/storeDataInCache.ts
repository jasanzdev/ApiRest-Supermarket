import redisClient from '../utils/redisClient'

interface Props {
    body: Buffer[],
    url: string,
    method: string
}

export const StoreDataInCache = async ({ body, url, method }: Props): Promise<string> => {
    const responseBody = Buffer.concat(body).toString()

    if (method === 'GET') {
        let cacheKey = url
        if (cacheKey.endsWith('/')) {
            cacheKey = cacheKey.slice(0, -1)
        }

        await redisClient.set(cacheKey, responseBody, { 'EX': 3600 })
    }

    return responseBody


}
