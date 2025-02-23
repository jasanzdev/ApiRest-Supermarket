"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFilters = CreateFilters;
const allowedCategories_1 = require("../constants/allowedCategories");
function CreateFilters({ query }) {
    const { category, minStock, minPrice, maxPrice } = query;
    const filter = {};
    if (category && typeof category === 'string' && allowedCategories_1.AllowedCategories.includes(category)) {
        filter.category = category;
    }
    if (minStock) {
        const parsedMinStock = Number(minStock);
        if (!isNaN(parsedMinStock))
            filter.minStock = parsedMinStock;
    }
    if (minPrice) {
        const parsedMinPrice = Number(minPrice);
        if (!isNaN(parsedMinPrice))
            filter.minPrice = parsedMinPrice;
    }
    if (maxPrice) {
        const parsedMaxPrice = Number(maxPrice);
        if (!isNaN(parsedMaxPrice))
            filter.maxPrice = parsedMaxPrice;
    }
    return filter;
}
