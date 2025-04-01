import mongoose from 'mongoose'
import { envs } from './config'

export default (async () => {
    try {
        await mongoose.connect(envs.mongoUrl)
        console.log('Mongodb connected')
    } catch (error) {
        console.log(`Mongodb connected error: ${error}`)
        process.exit(1)
    }
})()