import mongoose, { Schema } from 'mongoose'
import { Cart } from '../types/cartTypes'

const cartSchema: Schema = new Schema<Cart>({
    user_id: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
}, {
    timestamps: true,
    versionKey: false
})

export const CartModel = mongoose.model<Cart>('Cart', cartSchema)