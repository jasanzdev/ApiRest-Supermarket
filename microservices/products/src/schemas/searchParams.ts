import z from 'zod'
import { Search } from '../types/types'

interface SearchQueryParams {
    keyword?: string,
    limit?: string,
    offset?: string
}

const searchSchema = z.object({
    keyword: z.string(),
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
})

export const ValidateSearchQueryParams = (params: SearchQueryParams) => {
    const result = searchSchema.safeParse(params)

    if (result.error) throw result.error

    return result.data as Search
}