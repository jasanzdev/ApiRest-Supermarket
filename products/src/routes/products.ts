import { Router } from "express"
import { ProductController } from "../controllers/Product";

export const CreateProductsRouter = () => {

    const router = Router();

    router.get('/', ProductController.getProducts)

    router.get('/:id', ProductController.getProductById)

    router.post('/', ProductController.createProduct)

    router.delete('/:id', ProductController.deleteProduct)

    router.patch('/:id', ProductController.updateProduct)

    return router
}