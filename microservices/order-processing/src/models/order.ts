import { Order } from '../dto/dto'
import { ProductCart, User } from '../types/types'
import { db } from '../config/postgres'

export default class OrderModel {

    static readonly findOne = async (orderId: Order['id']): Promise<Order | null> => {
        const result = await db.query(
            `SELECT * FROM orders
            WHERE id = $1`,
            [orderId])

        return result.rowCount ? result.rows[0] : null
    }

    static readonly find = async (userId: User['id']): Promise<Order[] | null> => {
        const result = await db.query(
            `SELECT * FROM orders
            WHERE user_id = $1::uuid`,
            [userId])

        return result.rowCount ? result.rows : null
    }

    static readonly create = async (userId: User['id'], products: ProductCart[], total: number): Promise<Order> => {
        const productsJson = JSON.stringify(products)
        const result = await db.query(
            `INSERT INTO orders (user_id, products, total)
            VALUES ($1::uuid, $2::jsonb, $3)
            RETURNING *`,
            [userId, productsJson, total])

        return result.rows[0]
    }

    static readonly update = async (orderId: Order['id'], status: string) => {
        const result = await db.query(
            `UPDATE orders
            SET status = $1
            WHERE id = $2 RETURNING *`,
            [status, orderId])

        return result.rows[0]
    }

    static readonly findPendingOrders = async (userId: string) => {
        const result = await db.query(
            `SELECT * FROM orders
            WHERE user_id = $1::uuid AND status = $2`,
            [userId, 'pending'])

        return result.rowCount ? result.rows[0] : null
    }
}
