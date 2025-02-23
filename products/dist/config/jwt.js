"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSecretKey = exports.accessSecretKey = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
exports.accessSecretKey = (_a = process.env.JWT_ACCESS_SECRET_KEY) !== null && _a !== void 0 ? _a : node_crypto_1.default.randomBytes(32).toString('base64');
exports.refreshSecretKey = (_b = process.env.JWT_REFRESH_SECRET_KEY) !== null && _b !== void 0 ? _b : node_crypto_1.default.randomBytes(32).toString('base64');
