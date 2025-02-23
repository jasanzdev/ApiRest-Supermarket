"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthRouter = void 0;
const express_1 = require("express");
const AuthUser_1 = require("../controllers/AuthUser");
const validateLogin_1 = require("../middlewares/validateLogin");
const CreateAuthRouter = () => {
    const router = (0, express_1.Router)();
    router.post('/login', validateLogin_1.ValidatedLogin, AuthUser_1.AuthenticationController.login);
    router.post('/logout', AuthUser_1.AuthenticationController.logout);
    router.post('/register', AuthUser_1.AuthenticationController.register);
    return router;
};
exports.CreateAuthRouter = CreateAuthRouter;
