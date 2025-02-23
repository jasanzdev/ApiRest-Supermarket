"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyFilters = ApplyFilters;
function ApplyFilters(products, filters) {
    const filteredProducts = products.filter(product => {
        let matches = true;
        if (filters.category && product.category !== filters.category) {
            matches = false;
        }
        if (filters.minStock && product.stock < filters.minStock) {
            matches = false;
        }
        if (filters.minPrice && product.price_sale < filters.minPrice) {
            matches = false;
        }
        if (filters.maxPrice && product.price_sale > filters.maxPrice) {
            matches = false;
        }
        if (filters.minPrice && filters.maxPrice && filters.maxPrice < filters.minPrice) {
            matches = false;
        }
        return matches;
    });
    return filteredProducts;
}
