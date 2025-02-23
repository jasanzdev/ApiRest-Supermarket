"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateProduct = ValidateProduct;
exports.ValidatePartialProduct = ValidatePartialProduct;
const zod_1 = __importDefault(require("zod"));
const allowedCategories_1 = require("../constants/allowedCategories");
const ProductSchema = zod_1.default.object({
    name: zod_1.default.string().max(55, { message: 'this👏is👏too👏big' }),
    description: zod_1.default.string(),
    category: zod_1.default.enum(allowedCategories_1.AllowedCategories),
    price_purchase: zod_1.default.number().positive(),
    price_sale: zod_1.default.number().positive(),
    stock: zod_1.default.number().int().min(1, { message: 'Cannot enter a product without stock' }),
    threshold: zod_1.default.number().positive().int().optional(),
    active: zod_1.default.boolean(),
    thumbnail: zod_1.default.string().optional(),
    code: zod_1.default.number().positive().
        refine((value) => value.toString().length === 13, { message: 'The code must be a number of 13 digits' })
});
function ValidateProduct(input) {
    const result = ProductSchema.refine((data) => data.price_sale > data.price_purchase, {
        message: 'The sale price must be higher than the purchase price',
        path: ['salePrice']
    }).safeParse(input);
    if (result.error)
        throw result.error;
    return result.data;
}
function ValidatePartialProduct(input) {
    const validateInput = Object.assign({}, input);
    delete validateInput['code'];
    const result = ProductSchema.partial().safeParse(validateInput);
    if (result.error)
        throw result.error;
    return result.data;
}
