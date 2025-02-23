"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessToken = exports.CreateAccessToken = void 0;
const jwt_1 = require("../config/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateAccessToken = (user, res) => {
    const accessToken = jsonwebtoken_1.default.sign({ user }, jwt_1.secretKey, { expiresIn: '1m' });
    const refreshToken = jsonwebtoken_1.default.sign({ user }, jwt_1.secretKey, { expiresIn: '1d' });
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 1000
    });
    return res.status(200).json(user);
};
exports.CreateAccessToken = CreateAccessToken;
const RefreshAccessToken = (user, res) => {
    const newAccessToken = jsonwebtoken_1.default.sign({ user }, jwt_1.secretKey, { expiresIn: '30s' });
    res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 1000
    }).send();
};
exports.RefreshAccessToken = RefreshAccessToken;
