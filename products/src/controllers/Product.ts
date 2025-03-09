import { Request, Response } from 'express'
import { ProductModel } from '../models/Products'
import { ValidatePartialProduct, ValidateProduct } from '../schemas/Product'
import { validate as uuidValidate } from 'uuid'
import { CreateFilters } from '../services/createProductsFilters'
import { ApplyFilters } from '../services/applyProductsFilters'
import CatchErrors from '../utils/catchErrors'
import { BAD_REQUEST, CONFLICT, OK } from '../constants/http'
import appAssert from '../utils/appAssert'
import AppErrorCode from '../constants/appErrorCode'

export class ProductController {

    static readonly getProducts = CatchErrors(async (req: Request, res: Response) => {
        const filters = CreateFilters(req)
        const products = await ProductModel.findAll()

        appAssert(
            products,
            CONFLICT,
            'Not Products already exists'
        )
        if (products) {
            const filteredProducts = ApplyFilters(products, filters)
            res.status(200).json({
                total: filteredProducts.length,
                products: filteredProducts
            })
        }
    })

    static readonly getProductById = CatchErrors(async (req: Request, res: Response) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            BAD_REQUEST,
            'The provided ID does not have a valid format',
            AppErrorCode.InvalidId
        )

        const product = await ProductModel.findById(id)
        res.status(200).json(!product ? { message: 'Product not found' } : product)
    })

    static readonly createProduct = CatchErrors(async (req: Request, res: Response) => {
        const response = ValidateProduct(req.body)

        const product = await ProductModel.create(response)
        res.status(201).json(product)
    })

    static readonly deleteProduct = CatchErrors(async (req: Request, res: Response) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            BAD_REQUEST,
            'The provided ID does not have a valid format',
            AppErrorCode.InvalidId
        )
        const deleted = await ProductModel.delete(id)

        res.status(OK).json(!deleted ? { message: 'Product not exist' } : { message: 'Product deleted successfully' })

    })

    static readonly updateProduct = CatchErrors(async (req: Request, res: Response) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            BAD_REQUEST,
            'The provided ID does not have a valid format',
            AppErrorCode.InvalidId
        )
        const validatedInput = ValidatePartialProduct(req.body)

        const updatedProduct = await ProductModel.update({ id: id, input: validatedInput })
        res.status(200).json(updatedProduct)
    })
}