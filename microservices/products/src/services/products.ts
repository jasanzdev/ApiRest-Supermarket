import { Product } from '../dto/product'
import { ProductModel } from '../models/Products'
import { Filters, PaginationResult, Search } from '../types/types'

export default class ProductServices {
    static readonly getAll = async (filters: Filters): Promise<PaginationResult> => {
        const { limit, offset } = filters

        const { products, count } = await ProductModel.findAll(filters)

        const totalPages = Math.ceil(count / limit)
        const currentPage = Math.floor(offset / limit + 1)

        return {
            pagination: {
                totalRecords: count,
                totalPages: totalPages,
                currentPage: currentPage,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1
            },
            products: products,
        }
    }

    static readonly search = async (params: Search): Promise<PaginationResult> => {
        const { limit, offset } = params
        const { products, count } = await ProductModel.search(params)

        const totalPages = Math.ceil(count / limit)
        const currentPage = Math.floor(offset / limit + 1)

        return {
            pagination: {
                totalRecords: count,
                totalPages: totalPages,
                currentPage: currentPage,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1
            },
            products: products,
        }
    }

    static readonly getCategories = async () => {
        const categories = await ProductModel.findCategories()
        return categories.length > 0 ? categories : null
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
