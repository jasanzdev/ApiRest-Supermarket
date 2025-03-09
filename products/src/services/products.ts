import { Product } from '../dto/product'
import { ProductModel } from '../models/Products'
import { Filters } from '../types/types'
import { ApplyFilters } from '../utils/applyProductsFilters'

export default class ProductServices {
    static readonly getAll = async (filters: Filters) => {
        const products = await ProductModel.findAll()
        return products.length > 0 ? ApplyFilters(products, filters) : products
    }

    static readonly getById = async (id: Product['id']) => {
        const product = await ProductModel.findById(id)
        return product
    }

    static readonly create = async (data: Product) => {
        const product = await ProductModel.create(data)
        return product
    }

    static readonly update = async (id: Product['id'], input: Partial<Product>) => {
        const updatedProduct = await ProductModel.update({ id, input })
        return updatedProduct
    }

    static readonly delete = async (id: Product['id']) => {
        return await ProductModel.delete(id)
    }
}
