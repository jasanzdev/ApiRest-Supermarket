import { db } from '../config/postgres'
import { Product } from '../dto/product'
import { Filters, Search } from '../types/types'
interface FindByProps {
    column: string,
    value: string | number
}

interface UpdateProps {
    id: Product['id'],
    input: Partial<Product>
}

export class ProductModel {

    static async findAll(filters: Filters) {
        const { category, stock, minPrice, maxPrice, limit, offset } = filters

        const result = await db.query(
            `SELECT * FROM product p
            WHERE (p.category = $1 OR $1 IS NULL)
                AND (p.stock > $2)
                AND (p.price_sale >= $3 AND (p.price_sale <= $4 OR $4 IS NULL))
            ORDER BY created_at DESC
            LIMIT $5
            OFFSET $6`,
            [category, stock, minPrice, maxPrice, limit, offset])

        const countResult = await db.query(
            `SELECT COUNT(*) FROM product p
            WHERE (p.category = $1 OR $1 IS NULL)
                AND (p.stock > $2)
                AND (p.price_sale >= $3 AND (p.price_sale <= $4 OR $4 IS NULL))`,
            [category, stock, minPrice, maxPrice])

        const count = Number(countResult.rows[0].count)
        const products = result.rows

        return { products, count }
    }

    static async search(params: Search) {
        const { keyword, limit, offset } = params

        const result = await db.query(
            `SELECT * FROM product p
            WHERE (p.name ILIKE $1) OR (p.description ILIKE $1)
            ORDER BY created_at DESC
            LIMIT $2
            OFFSET $3`,
            [`%${keyword}%`, limit, offset])

        const countResult = await db.query(
            `SELECT COUNT(*) FROM product p
            WHERE (p.name ILIKE $1) OR (p.description ILIKE $1)`,
            [`%${keyword}%`])

        const count = Number(countResult.rows[0].count)
        const products = result.rows

        return { products, count }
    }

    static async findCategories() {
        const result = await db.query(
            'SELECT json_agg(DISTINCT category) AS categories FROM product')
        return result.rows
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
        const result = await db.query('DELETE FROM product WHERE product.id = $1', [id])
        return result.rowCount === 1
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
