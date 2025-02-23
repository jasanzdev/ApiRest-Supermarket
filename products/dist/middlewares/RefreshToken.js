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
exports.RefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken_1 = require("../tokenServices/createToken");
const jwt_1 = require("../config/jwt");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const http_1 = require("../constants/http");
const Session_1 = require("../models/Session");
const RefreshToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ res, refreshToken, userAgent }) {
    (0, appAssert_1.default)(refreshToken, http_1.UNAUTHORIZED, 'Access not authorized', "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    const { sessionsId } = jsonwebtoken_1.default.verify(refreshToken, jwt_1.refreshSecretKey);
    const session = yield Session_1.SessionModel.getBy(sessionsId, userAgent);
    (0, appAssert_1.default)(session, http_1.UNAUTHORIZED, 'Access Token Expired', "AccessTokenExpired" /* AppErrorCode.AccessTokenExpired */);
    const userID = session.user_id;
    (0, createToken_1.CreateAccessToken)(userID, res);
    return userID;
});
exports.RefreshToken = RefreshToken;
