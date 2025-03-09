import z from 'zod'
import { AllowedCategories } from '../constants/allowedCategories'
import { Product } from '../dto/product'

const ProductSchema = z.object({
    name: z.string().max(55, { message: 'this👏is👏too👏big' }),

    description: z.string(),

    category: z.enum(AllowedCategories),

    price_purchase: z.number().positive(),

    price_sale: z.number().positive(),

    stock: z.number().int().min(1, { message: 'Cannot enter a product without stock' }),

    threshold: z.number().positive().int().optional(),

    active: z.boolean().default(true),

    thumbnail: z.string().optional(),

    code: z.number().positive().
        refine((value) => value.toString().length === 13,
            { message: 'The code must be a number of 13 digits' })
})

export function ValidateProduct(input: Product) {
    const result = ProductSchema.refine(
        (data) => data.price_sale > data.price_purchase,
        {
            message: 'The sale price must be higher than the purchase price',
            path: ['salePrice']
        }
    ).safeParse(input)

    if (result.error) throw result.error

    return result.data as Product
}

export function ValidatePartialProduct(input: Partial<Product>) {
    const validateInput = { ...input }
    delete validateInput['code']
    const result = ProductSchema.partial().safeParse(validateInput)

    if (result.error) throw result.error

    return result.data as Product
}