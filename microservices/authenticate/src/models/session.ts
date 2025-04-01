import mongoose, { Schema } from 'mongoose'
import { Sessions } from '../types/types.d'

const sessionSchema: Schema = new Schema({
    userId: {
        type: String,
        require: true
    },
    userAgent: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

export const SessionModel = mongoose.model<Sessions>('session', sessionSchema)