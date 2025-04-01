import AppErrorCode from '../constants/appErrorCode'
import { NOT_FOUND } from '../constants/http'
import { ProductModel } from '../models/products'
import {
    Filters,
    InventoryAdjustment,
    PaginationResult,
    Product,
    RegisterInventoryAdjustment,
    Search
} from '../types/types.d'
import appAssert from '../utils/appAssert'
import { ApplyInventoryAdjustment } from '../utils/applyInventoryAdjustment'

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
        return await ProductModel.findById(id)

    }

    static readonly getByCode = async (code: Product['code']) => {
        return await ProductModel.findByCode(code)
    }

    static readonly create = async (data: Product) => {
        return await ProductModel.create(data)
    }

    static readonly update = async (id: Product['id'], input: Partial<Product>) => {
        return await ProductModel.update({ id, input })
    }

    static readonly delete = async (id: Product['id']) => {
        return await ProductModel.delete(id)
    }

    static readonly inventoryAdjustment = async (id: Product['id'], inventoryAdjustmentBody: InventoryAdjustment) => {
        const { type, quantity } = inventoryAdjustmentBody

        const product = await ProductModel.findById(id)

        appAssert(product, NOT_FOUND, 'Product not found', AppErrorCode.ProductNotExist)

        const newStock = ApplyInventoryAdjustment(product.stock, quantity, type)

        appAssert(newStock !== null, NOT_FOUND, 'Insufficient stock', AppErrorCode.InsufficientStock)

        const newInventoryAdjustment: RegisterInventoryAdjustment = {
            ...inventoryAdjustmentBody,
            productId: id,
            previousStock: product.stock,
            newStock: newStock
        }

        await ProductModel.registerInventoryAdjustment(newInventoryAdjustment)

        return await ProductModel.update({ id, input: { stock: newStock } })
    }
}
