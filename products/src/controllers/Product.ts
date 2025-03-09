import { Request, Response } from 'express'
import { ValidatePartialProduct, ValidateProduct } from '../schemas/Product'
import { validate as uuidValidate } from 'uuid'
import { CreateFilters } from '../utils/createProductsFilters'
import CatchErrors from '../utils/catchErrors'
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK } from '../constants/http'
import appAssert from '../utils/appAssert'
import AppErrorCode from '../constants/appErrorCode'
import ProductServices from '../services/products'

export class ProductController {

    static readonly getProducts = CatchErrors(async (req: Request, res: Response) => {
        const filters = CreateFilters(req)

        const products = await ProductServices.getAll(filters)

        res.status(OK).json(
            {
                total: products.length,
                products: products
            })

    })

    static readonly getProductById = CatchErrors(async (req: Request, res: Response) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            BAD_REQUEST,
            'The provided ID does not have a valid format',
            AppErrorCode.InvalidId
        )

        const product = await ProductServices.getById(id)
        res.status(product ? OK : NOT_FOUND).json(!product
            ? { message: 'Product not found' }
            : product)
    })

    static readonly createProduct = CatchErrors(async (req: Request, res: Response) => {
        const response = ValidateProduct(req.body)
        const product = await ProductServices.create(response)
        res.status(CREATED).json(product)
    })

    static readonly deleteProduct = CatchErrors(async (req: Request, res: Response) => {
        const { id } = req.params

        appAssert(
            uuidValidate(id),
            BAD_REQUEST,
            'The provided ID does not have a valid format',
            AppErrorCode.InvalidId
        )

        const deleted = await ProductServices.delete(id)
        res.status(deleted ? NO_CONTENT : NOT_FOUND).json({ message: 'Impossible to delete, product does not exist' })

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

        const updatedProduct = await ProductServices.update(id, validatedInput)
        res.status(updatedProduct ? OK : NOT_FOUND).json(updatedProduct
            ? {
                product: updatedProduct
            }
            : {
                message: 'Impossible to update, product does not exist'
            })
    })
}