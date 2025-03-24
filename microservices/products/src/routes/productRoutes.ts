import { Router } from 'express'
import { ProductController } from '../controllers/productController'

export const CreateProductsRouter = () => {

  const router = Router()

  router.get('/', ProductController.getFilteredProducts)

  router.get('/categories', ProductController.getCategories)

  router.get('/search', ProductController.search)

  router.get('/:id', ProductController.getProductById)

  router.get('/code/:code', ProductController.getProductByCode)

  router.post('/', ProductController.createProduct)

  router.delete('/:id', ProductController.deleteProduct)

  router.patch('/:id', ProductController.updateProduct)

  router.patch('/adjust-inventory/:id', ProductController.inventoryAdjustment)

  return router
}