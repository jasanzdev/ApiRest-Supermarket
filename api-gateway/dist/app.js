"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = require("express");
const productsProxy_1 = require("./proxies/productsProxy");
const authProxy_1 = require("./proxies/authProxy");
server_1.default.use((0, cors_1.default)());
server_1.default.disable('x-powered-by');
server_1.default.use((0, cookie_parser_1.default)());
server_1.default.use((0, helmet_1.default)());
server_1.default.get('/', (req, res) => {
    res.send('Hello!, Docker is running');
});
server_1.default.use('/auth', authProxy_1.AuthProxy);
server_1.default.use('/products', productsProxy_1.ProductProxy);
server_1.default.use((0, express_1.json)());
