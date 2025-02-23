"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsExpiredToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const IsExpiredToken = (accessToken) => {
    if (!accessToken)
        return true;
    try {
        const decoded = jsonwebtoken_1.default.decode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    }
    catch (error) {
        console.log(error);
        return true;
    }
};
exports.IsExpiredToken = IsExpiredToken;
