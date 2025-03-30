import mongoose, { Schema } from 'mongoose'
import { Order } from '../types/orderType'
import { OrderStatus } from '../constants/orderStatus'

const orderSchema: Schema = new Schema<Order>({
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
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [...OrderStatus],
        default: 'Pending'
    }
}, {
    timestamps: true,
    versionKey: false
})

export const OrderModel = mongoose.model<Order>('Order', orderSchema)