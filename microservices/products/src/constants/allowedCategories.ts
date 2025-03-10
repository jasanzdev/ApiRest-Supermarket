export const AllowedCategories = [
    'beauty',
    'groceries',
    'fragrances',
    'furniture',
    'smartphones',
    'laptops',
    'mobile-accessories',
    'tablets'
] as const

export type Category = typeof AllowedCategories[number]