"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRouter = void 0;
const express_1 = require("express");
const User_1 = __importDefault(require("../controllers/User"));
const CreateUserRouter = () => {
    const router = (0, express_1.Router)();
    router.get('/', User_1.default.getAll);
    router.delete('/:id', User_1.default.delete);
    return router;
};
exports.CreateUserRouter = CreateUserRouter;
