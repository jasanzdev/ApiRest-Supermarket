"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthRouter = void 0;
const express_1 = require("express");
const authUser_1 = require("../controllers/authUser");
const CreateAuthRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/login', authUser_1.AuthenticationController.login);
    router.post('/logout', authUser_1.AuthenticationController.logout);
    router.post('/register', authUser_1.AuthenticationController.register);
    return router;
};
exports.CreateAuthRouter = CreateAuthRouter;
