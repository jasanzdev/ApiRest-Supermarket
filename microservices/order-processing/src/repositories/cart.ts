import { CartModel } from '../models/cart'
import { Cart, ICartRepository, ProductCart } from '../types/cartTypes'
import { User } from '../types/types.d'

export class CartRepository implements ICartRepository {

    async findOne(userId: User['id']): Promise<Cart | null> {
        return await CartModel.findOne({ user_id: userId }).exec()
    }

    async addToCart(products: ProductCart[], userId: User['id']): Promise<Cart> {
        const newCart = new CartModel({
            user_id: userId,
            products: products
        })
        return await newCart.save()
    }

    async update(products: ProductCart[], userId: User['id']): Promise<Cart | null> {
        const updatedCart = await CartModel.findOneAndUpdate(
            { user_id: userId },
            {
                $set: { products: products },
            },
            { new: true }
        ).exec()

        return updatedCart
    }

    async delete(id: string): Promise<void> {
        await CartModel.findByIdAndDelete(id)
    }
};
