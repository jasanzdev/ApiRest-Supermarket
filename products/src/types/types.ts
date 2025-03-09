import { Category } from '../constants/allowedCategories'

export type Filters = {
    category?: Category,
    minStock?: number,
    minPrice?: number,
    maxPrice?: number
}