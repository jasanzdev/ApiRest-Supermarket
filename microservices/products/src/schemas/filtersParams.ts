import z from 'zod'
import { Filters } from '../types/types'

interface FilterQueryParams {
    category?: string,
    stock?: string,
    minPrice?: string,
    maxPrice?: string,
    limit?: string,
    offset?: string
}

const filtersSchema = z.object({
    category: z.string().optional(),
    stock: z.string()
        .transform(Number)
        .refine((n): n is number => !isNaN(n),
            {
                message: 'Invalid stock value. Please enter a valid number.',
                path: ['stock']
            })
        .refine((n): n is number => n >= 0, {
            message: 'Stock must be a positive number.',
            path: ['stock']
        })
        .default('0'),
    minPrice: z.string()
        .transform(Number)
        .refine((n): n is number => !isNaN(n),
            {
                message: 'Invalid minPrice value. Please enter a valid number.',
                path: ['minPrice']
            })
        .refine((n): n is number => n >= 0, {
            message: 'MinPrice must be a positive number.',
            path: ['minPrice']
        })
        .default('0'),
    maxPrice: z.string()
        .transform(Number)
        .refine((n): n is number => !isNaN(n),
            {
                message: 'Invalid maxPrice value. Please enter a valid number.',
                path: ['maxPrice']
            })
        .refine((n): n is number => n >= 0, {
            message: 'MaxPrice must be a positive number.',
            path: ['maxPrice']
        })
        .optional(),
    limit: z.string()
        .transform(Number)
        .refine((n): n is number => !isNaN(n),
            {
                message: 'Invalid limit value. Please enter a valid number.',
                path: ['limit']
            })
        .refine((n): n is number => n >= 0, {
            message: 'Limit must be a positive number.',
            path: ['limit']
        })
        .default('10'),
    offset: z.string()
        .transform(Number)
        .refine((n): n is number => !isNaN(n),
            {
                message: 'Invalid offset value. Please enter a valid number.',
                path: ['offset']
            })
        .refine((n): n is number => n >= 0, {
            message: 'Offset must be a positive number.',
            path: ['offset']
        })
        .default('0'),
}).refine((data) => {
    if (data.maxPrice === undefined) return true
    return data.maxPrice > data.minPrice
}, {
    message: 'MaxPrice must be greater than minPrice',
    path: ['maxPrice']
})

export const ValidateFiltersQueryParams = (params: FilterQueryParams) => {
    const result = filtersSchema.safeParse(params)

    if (result.error) throw result.error

    return result.data as Filters
}