"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRefreshToken = exports.CreateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const date_1 = require("../utils/date");
const jwt_1 = require("../config/jwt");
const secure = process.env.NODE_ENV === 'production';
const defaults = {
    httpOnly: true,
    sameSite: 'strict',
    secure,
};
const getAccessTokenCookieOptions = () => (Object.assign(Object.assign({}, defaults), { expires: (0, date_1.FifteenMinutesFromNow)() }));
const getRefreshTokenCookieOptions = () => (Object.assign(Object.assign({}, defaults), { expires: (0, date_1.ThirtyDaysFromNow)() }));
const CreateAccessToken = (userID, res) => {
    const accessToken = jsonwebtoken_1.default.sign({
        userId: userID,
        sessionId: userID
    }, jwt_1.accessSecretKey, {
        expiresIn: '15m'
    });
    res.cookie('access_token', accessToken, getAccessTokenCookieOptions());
};
exports.CreateAccessToken = CreateAccessToken;
const CreateRefreshToken = (sessionID, res) => {
    const refreshToken = jsonwebtoken_1.default.sign({ sessionId: sessionID }, jwt_1.refreshSecretKey, {
        expiresIn: '30d'
    });
    res.cookie('refresh_token', refreshToken, getRefreshTokenCookieOptions());
};
exports.CreateRefreshToken = CreateRefreshToken;
