import { Product } from '../dto/product'

export type Filters = {
    category?: string,
    stock: number,
    minPrice: number,
    maxPrice?: number,
    limit: number,
    offset: number
}

export type Search = {
    keyword: string,
    limit: number,
    offset: number
}

export interface PaginationResult {
    pagination: {
        totalRecords: number
        totalPages: number
        currentPage: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    }
    products: Product[]
}