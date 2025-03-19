export const AllowedCategories = [
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories',
    'laptops',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'mobile-accessories',
    'motorcycle',
    'skin-care',
    'smartphones',
    'sports-accessories',
    'sunglasses',
    'tablets',
    'tops',
    'vehicle',
    'women-bags',
    'women-dresses',
    'women-jewelry',
    'women-shoes',
    'women-watches'
] as const

export type Category = typeof AllowedCategories[number]