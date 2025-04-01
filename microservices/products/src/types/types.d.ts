import { UUIDTypes } from 'uuid'
import { InventoryAdjustmentTypes } from '../constants/inventoryAdjustmentTypes'
import { Roles } from '../constants/roles'
import { Product } from '../dto/product'
import { Category } from '../constants/allowedCategories'

export interface Product {
    id?: UUIDTypes,
    name: string,
    description: string,
    category: Category,
    price: number,
    stock: number,
    threshold: number,
    active: boolean,
    thumbnail: string,
    code: number
}

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

export type PaginationResult = {
    pagination: {
        totalRecords: number
        totalPages: number
        currentPage: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    }
    products: Product[]
}

export interface InventoryAdjustment {
    type: InventoryAdjustmentTypes
    quantity: number
    reason: string,
    userId: UUIDTypes,
}

export interface RegisterInventoryAdjustment extends InventoryAdjustment {
    productId: Product['id']
    previousStock: number
    newStock: number
}

export type User = {
    id: UUIDTypes,
    name: string,
    username: string,
    email: string,
    role: Roles
}
