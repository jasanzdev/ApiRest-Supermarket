import { UUIDTypes } from 'uuid'
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