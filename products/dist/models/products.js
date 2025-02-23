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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const postgres_1 = require("../config/postgres");
class ProductModel {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.db.query('SELECT * FROM product');
            return result.rowCount ? result.rows : null;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.db.query('SELECT * FROM product where product.id = $1', [id]);
            return result.rowCount ? result.rows[0] : null;
        });
    }
    static findBy(_a) {
        return __awaiter(this, arguments, void 0, function* ({ column, value }) {
            const result = yield postgres_1.db.query(`SELECT * FROM product where product.${column} = $1`, [value]);
            return result.rowCount ? result.rows : null;
        });
    }
    static create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, category, price_purchase, price_sale, stock, threshold, active, thumbnail, code } = input;
            const result = yield postgres_1.db.query(`INSERT INTO product (name, description, category, price_purchase, price_sale, stock, threshold, active, thumbnail,code) 
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`, [name, description, category, price_purchase, price_sale, stock, threshold, active, thumbnail, code]);
            return result.rows[0];
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postgres_1.db.query(`DELETE FROM product WHERE product.id = $1`, [id]);
        });
    }
    static update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, input }) {
            const update = Object.keys(input).map((key, index) => `${key} = $${index + 2}`).join(', ');
            const values = Object.values(input);
            const updated = yield postgres_1.db.query(`UPDATE product SET ${update} WHERE product.id = $1 RETURNING *`, [id, ...values]);
            return updated.rowCount ? updated.rows[0] : null;
        });
    }
}
exports.ProductModel = ProductModel;
