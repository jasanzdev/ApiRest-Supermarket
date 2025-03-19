import { Product } from '../dto/product'
import { Filters } from '../types/types'

export function ApplyFilters(products: Product[], filters: Filters) {
    const filteredProducts = products.filter(product => {
        let matches = true

        if (filters.category && product.category !== filters.category) {
            matches = false
        }

        if (filters.stock && product.stock < filters.stock) {
            matches = false
        }

        if (filters.minPrice && product.price_sale < filters.minPrice) {
            matches = false
        }

        if (filters.maxPrice && product.price_sale > filters.maxPrice) {
            matches = false
        }

        if (filters.minPrice && filters.maxPrice && filters.maxPrice < filters.minPrice) {
            matches = false
        }

        return matches
    })

    return filteredProducts
}