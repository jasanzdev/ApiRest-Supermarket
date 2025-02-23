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
        if (filters.minPrice && product.salePrice < filters.minPrice) {
            matches = false;
        }
        if (filters.maxPrice && product.salePrice > filters.maxPrice) {
            matches = false;
        }
        return matches;
    });
    return filteredProducts;
}
