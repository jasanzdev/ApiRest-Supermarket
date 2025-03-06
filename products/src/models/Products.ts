import { db } from '../config/postgres'
import { Product } from '../types/product'

interface FindByProps {
    column: string,
    value: string | number
}

interface UpdateProps {
    id: Product['id'],
    input: Partial<Product>
}

export class ProductModel {

    static async findAll() {
        const result = await db.query('SELECT * FROM product')
        return result.rowCount ? result.rows : null
    }

    static async findById(id: Product['id']) {
        const result = await db.query('SELECT * FROM product where product.id = $1', [id])
        return result.rowCount ? result.rows[0] : null
    }

    static async findBy({ column, value }: FindByProps) {
        const result = await db.query(`SELECT * FROM product where product.${column} = $1`, [value])
        return result.rowCount ? result.rows : null
    }

    static async create(input: Product) {
        const { name,
            description,
            category,
            price_purchase,
            price_sale,
            stock,
            threshold,
            active,
            thumbnail,
            code } = input

        const result = await db.query(
            `INSERT INTO product (name, description, category, price_purchase, price_sale, stock, threshold, active, thumbnail,code)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [name, description, category, price_purchase, price_sale, stock, threshold, active, thumbnail, code])

        return result.rows[0]
    }

    static async delete(id: Product['id']) {
        return await db.query('DELETE FROM product WHERE product.id = $1', [id])
    }

    static async update({ id, input }: UpdateProps) {
        const inputWithUpdatedAt = {
            ...input,
            updated_at: new Date()
        }
        const update = Object.keys(inputWithUpdatedAt).map((key, index) => `${key} = $${index + 2}`).join(', ')
        const values = Object.values(inputWithUpdatedAt)
        const updated = await db.query(
            `UPDATE product SET ${update} WHERE product.id = $1 RETURNING *`,
            [id, ...values])

        return updated.rowCount ? updated.rows[0] : null
    }
}
