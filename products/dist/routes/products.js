"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsRouter = void 0;
const express_1 = require("express");
const Product_1 = require("../controllers/Product");
const CreateProductsRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', Product_1.ProductController.getProducts);
    router.get('/:id', Product_1.ProductController.getProductById);
    router.post('/', Product_1.ProductController.createProduct);
    router.delete('/:id', Product_1.ProductController.deleteProduct);
    router.patch('/:id', Product_1.ProductController.updateProduct);
    return router;
};
exports.CreateProductsRouter = CreateProductsRouter;
