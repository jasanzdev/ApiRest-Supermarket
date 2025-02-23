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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const http_1 = require("../constants/http");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const jwt_1 = require("../config/jwt");
const refreshToken_1 = require("./refreshToken");
const Users_1 = require("../models/Users");
exports.Authenticate = (0, catchErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    const userAgent = req.headers['user-agent'];
    (0, appAssert_1.default)(refreshToken, http_1.UNAUTHORIZED, 'Access not authorized', "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    if (!accessToken) {
        console.log('no access token');
        const userID = yield (0, refreshToken_1.RefreshToken)({ res, refreshToken, userAgent });
        const user = yield Users_1.UserModel.findById(userID);
        (0, appAssert_1.default)(user, http_1.NOT_FOUND, 'User not found', "UserDoesNotExist" /* AppErrorCode.UserNotExist */);
        req.user = Users_1.UserModel.toPublish(user);
        next();
    }
    const { userId } = jsonwebtoken_1.default.verify(accessToken, jwt_1.accessSecretKey);
    const user = yield Users_1.UserModel.findById(userId);
    (0, appAssert_1.default)(user, http_1.NOT_FOUND, 'User not found', "UserDoesNotExist" /* AppErrorCode.UserNotExist */);
    req.user = Users_1.UserModel.toPublish(user);
    next();
}));
