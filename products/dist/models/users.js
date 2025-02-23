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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const postgres_1 = require("../config/postgres");
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = Number(process.env.SALT_ROUNDS) || 10;
class UserModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.db.query('SELECT * FROM users');
            return result.rowCount ? result.rows : null;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.db.query('SELECT * FROM users WHERE users.id = $1', [id]);
            return result.rowCount ? result.rows[0] : null;
        });
    }
    static create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, username, password, email, role } = input;
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            const user = yield postgres_1.db.query(`INSERT INTO users (name, username, email, password, role)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, username, email, hashPassword, role]);
            return user.rows[0];
        });
    }
    static findBy(_a) {
        return __awaiter(this, arguments, void 0, function* ({ column, value }) {
            const result = yield postgres_1.db.query(`SELECT * FROM users WHERE users.${column} = $1`, [value]);
            return result.rowCount ? result.rows[0] : null;
        });
    }
    static update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(input, id);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postgres_1.db.query(`DELETE FROM users WHERE users.id = $1`, [id]);
        });
    }
    static toPublish(user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password } = user, rest = __rest(user, ["password"]);
        return rest;
    }
}
exports.UserModel = UserModel;
