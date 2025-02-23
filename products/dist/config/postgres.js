"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
exports.db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
});
exports.db.query('SELECT NOW()')
    .then((res) => {
    console.log('Connection successfully to PostgreSQL:', res.rows[0]);
})
    .catch((error) => {
    console.error('Error attempt connect to PostgreSQL:', error);
});
