"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
exports.db = new Pool(process.env.NODE_ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
    }
    : {
        user: 'postgres',
        host: 'localhost',
        database: 'supermarket-dev',
        password: 'Postgres123',
        port: 5433,
    });
exports.db.query('SELECT NOW()')
    .then((res) => {
    console.log('Connection successfully to PostgreSQL:', res.rows[0]);
})
    .catch((error) => {
    console.error('Error attempt connect to PostgreSQL:', error);
});
