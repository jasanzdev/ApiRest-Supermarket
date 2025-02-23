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
exports.AuthenticationController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../schemas/User");
const Users_1 = require("../models/Users");
const createToken_1 = require("../tokenServices/createToken");
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const http_1 = require("../constants/http");
const Session_1 = require("../models/Session");
const jwt_1 = require("../config/jwt");
class AuthenticationController {
}
exports.AuthenticationController = AuthenticationController;
_a = AuthenticationController;
AuthenticationController.login = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const RequestUser = req.user;
    const dataSession = {
        id: RequestUser === null || RequestUser === void 0 ? void 0 : RequestUser.id,
        userAgent: req.headers['user-agent'],
    };
    const session = yield Session_1.SessionModel.create(dataSession);
    console.log(session);
    (0, createToken_1.CreateRefreshToken)(session.user_id, res);
    (0, createToken_1.CreateAccessToken)(RequestUser === null || RequestUser === void 0 ? void 0 : RequestUser.id, res);
    res.status(http_1.OK).json({ message: 'Login successfully' });
}));
AuthenticationController.register = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = yield (0, User_1.validateUser)(req.body);
    const userAgent = req.headers['user-agent'];
    const user = yield Users_1.UserModel.create(validatedData);
    const dataSession = {
        id: user.id,
        userAgent: userAgent,
    };
    const session = yield Session_1.SessionModel.create(dataSession);
    (0, createToken_1.CreateRefreshToken)(session.user_id, res);
    (0, createToken_1.CreateAccessToken)(user.id, res);
    res.status(http_1.OK).json(user);
}));
AuthenticationController.logout = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies['refresh_token'];
    if (refreshToken) {
        const { sessionsID } = jsonwebtoken_1.default.verify(refreshToken, jwt_1.refreshSecretKey);
        yield Session_1.SessionModel.delete(sessionsID);
    }
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).json({ message: 'Logout successfully' });
}));
