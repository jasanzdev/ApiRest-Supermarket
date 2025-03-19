import { createClient } from 'redis'

export class CacheManager {
    private readonly client

    constructor(url: string) {
        this.client = createClient({
            url: url
        })
    }

    private async connectIfNecessary(): Promise<void> {
        if (this.client.isReady) return
        await this.client.connect()
    }

    async isHealthy(): Promise<boolean> {
        try {
            await this.connectIfNecessary()
            await this.client.ping()
            return true
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}