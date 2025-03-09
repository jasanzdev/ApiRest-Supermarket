import { Request } from 'express'
import { Filters } from '../types/types'
import { AllowedCategories, Category } from '../constants/allowedCategories'

export function CreateFilters({ query }: Request) {
    const { category, minStock, minPrice, maxPrice } = query
    const filter: Filters = {}

    if (category && typeof category === 'string' && AllowedCategories.includes(category as Category)) {
        filter.category = category as Category
    }

    if (minStock) {
        const parsedMinStock = Number(minStock)
        if (!isNaN(parsedMinStock)) filter.minStock = parsedMinStock
    }
    if (minPrice) {
        const parsedMinPrice = Number(minPrice)
        if (!isNaN(parsedMinPrice)) filter.minPrice = parsedMinPrice
    }
    if (maxPrice) {
        const parsedMaxPrice = Number(maxPrice)
        if (!isNaN(parsedMaxPrice)) filter.maxPrice = parsedMaxPrice
    }

    return filter
}