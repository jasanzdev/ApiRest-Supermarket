"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const CreateAuthRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/login', auth_1.AuthenticationController.login);
    router.post('/logout', auth_1.AuthenticationController.logout);
    router.post('/register', auth_1.AuthenticationController.register);
    return router;
};
exports.CreateAuthRouter = CreateAuthRouter;
