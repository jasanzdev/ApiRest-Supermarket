"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSession = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const CreateSession = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(403).send('Access not authorized');
        return;
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, jwt_1.secretKey);
        const user = data.user;
        if (!user.role) {
            res.status(403).send('Access not authorized');
            return;
        }
        req.cookies.user = user;
        next();
    }
    catch (error) {
        console.error("Error to verifying token", error);
        res.status(401).json({ message: "Invalid Token " });
    }
};
exports.CreateSession = CreateSession;
