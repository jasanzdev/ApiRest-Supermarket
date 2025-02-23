"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Products_1 = require("../models/Products");
const Product_1 = require("../schemas/Product");
const uuid_1 = require("uuid");
const createProductsFilters_1 = require("../services/createProductsFilters");
const applyProductsFilters_1 = require("../services/applyProductsFilters");
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const http_1 = require("../constants/http");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
class ProductController {
}
exports.ProductController = ProductController;
_a = ProductController;
ProductController.getProducts = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, createProductsFilters_1.CreateFilters)(req);
    const products = yield Products_1.ProductModel.findAll();
    (0, appAssert_1.default)(products, http_1.CONFLICT, 'Not Products already exists');
    if (products) {
        const filteredProducts = (0, applyProductsFilters_1.ApplyFilters)(products, filters);
        res.status(200).json(filteredProducts);
    }
}));
ProductController.getProductById = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, appAssert_1.default)((0, uuid_1.validate)(id), http_1.BAD_REQUEST, 'The provided ID does not have a valid format', "InvalidId" /* AppErrorCode.InvalidId */);
    const product = yield Products_1.ProductModel.findById(id);
    res.status(200).json(!product ? { message: 'Product not found' } : product);
}));
ProductController.createProduct = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = (0, Product_1.ValidateProduct)(req.body);
    const product = yield Products_1.ProductModel.create(response);
    res.status(201).json(product);
}));
ProductController.deleteProduct = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, appAssert_1.default)((0, uuid_1.validate)(id), http_1.BAD_REQUEST, 'The provided ID does not have a valid format', "InvalidId" /* AppErrorCode.InvalidId */);
    const deleted = yield Products_1.ProductModel.delete(id);
    res.status(http_1.OK).json(!deleted ? { message: 'Product not exist' } : { message: 'Product deleted successfully' });
}));
ProductController.updateProduct = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, appAssert_1.default)((0, uuid_1.validate)(id), http_1.BAD_REQUEST, 'The provided ID does not have a valid format', "InvalidId" /* AppErrorCode.InvalidId */);
    const validatedInput = (0, Product_1.ValidatePartialProduct)(req.body);
    const updatedProduct = yield Products_1.ProductModel.update({ id: id, input: validatedInput });
    res.status(200).json(updatedProduct);
}));
