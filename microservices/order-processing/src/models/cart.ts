import { Cart } from '../dto/dto'
import { ProductCart, User } from '../types/types'
import { db } from '../utils/postgres'

export default class CartModel {

    static readonly getCart = async (userId: User['id']) => {
        const result = await db.query(
            `SELECT * FROM cart
            WHERE cart.user_id = $1::uuid`,
            [userId])

        return result.rowCount ? result.rows[0] : null
    }

    static readonly addToCart = async (products: ProductCart[], userId: User['id']) => {
        const productsJson = JSON.stringify(products)
        const query = `
                INSERT INTO cart (user_id, products)
                    VALUES ($1::uuid, $2::jsonb)
                    ON CONFLICT (user_id) 
                    DO UPDATE SET 
                    products = $2::jsonb,
                    updated_at = NOW()
                    RETURNING *;
                `
        const result = await db.query(query, [userId, productsJson])

        return result.rows[0]
    }

    static readonly updateCart = async (products: ProductCart[]) => {
        const productsJson = JSON.stringify(products)
        const result = await db.query('UPDATE cart SET products = $1::jsonb RETURNING *',
            [productsJson])

        return result.rows[0]
    }

    static readonly delete = async (id: Cart['id']) => {
        await db.query('DELETE FROM cart WHERE id = $1', [id])
    }
}
