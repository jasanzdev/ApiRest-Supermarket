"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const axios_1 = __importDefault(require("axios"));
const handlerCookie_1 = require("../utils/handlerCookie");
class Authenticate {
}
exports.Authenticate = Authenticate;
_a = Authenticate;
Authenticate.verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return _a.getNewAccessToken(req, res);
    }
    if (accessToken) {
        const response = yield axios_1.default.get('http://localhost:4000/verify-token', {
            headers: { 'Cookie': `access_token=${accessToken}` }
        });
        const { user } = response.data;
        return user;
    }
    return null;
});
Authenticate.getNewAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refresh_token;
    const userAgent = req.headers['user-agent'];
    if (!refreshToken)
        return null;
    const response = yield axios_1.default.get('http://localhost:4000/refresh-token', {
        headers: {
            'Cookie': `refresh_token=${refreshToken}`,
            'User-Agent': userAgent
        }
    });
    const setCookies = response.headers['set-cookie'];
    if (setCookies) {
        const newAccessToken = (0, handlerCookie_1.CookiesHandler)(setCookies);
        if (newAccessToken) {
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            const { user } = response.data;
            return user;
        }
    }
    return null;
});
