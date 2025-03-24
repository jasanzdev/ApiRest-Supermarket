import z from 'zod'
import { AllowedCategories } from '../constants/allowedCategories'
import { Product } from '../dto/product'

const ProductSchema = z.object({
    name: z.string().max(55, { message: 'this👏is👏too👏big, name must not exceed 55 characters.' }),

    description: z.string()
        .min(1, { message: 'Description cannot be empty.' }),

    category: z.enum(AllowedCategories, {
        errorMap: () => {
            return {
                message: `Invalid category. It must be one of: ${AllowedCategories.join(', ')}.`
            }
        }
    }),

    price_purchase: z.number()
        .positive({ message: 'Purchase price must be a positive number.' }),

    price_sale: z.number()
        .positive({ message: 'Sale price must be a positive number.' }),

    stock: z.number()
        .int({ message: 'Stock must be an integer.' })
        .positive({ message: 'Stock must be a positive number.' }),

    threshold: z.number()
        .int({ message: 'Threshold must be an integer.' })
        .positive({ message: 'Threshold must be a positive number.' })
        .default(0),

    active: z.boolean().default(true),

    thumbnail: z.string().optional(),

    code: z.number()
        .positive({ message: 'Code must be a positive number.' })
        .refine(
            (value) => value.toString().length === 13,
            { message: 'The code must be a number with exactly 13 digits.' }
        )
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