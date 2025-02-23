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
exports.ValidatedLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../models/Users");
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const http_1 = require("../constants/http");
exports.ValidatedLogin = (0, catchErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    (0, appAssert_1.default)(username && password, http_1.BAD_REQUEST, 'The username && password is require');
    const user = yield Users_1.UserModel.findBy({ column: 'username', value: username });
    (0, appAssert_1.default)(user, http_1.BAD_REQUEST, 'Invalid username or password');
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    (0, appAssert_1.default)(isValid, http_1.BAD_REQUEST, 'Invalid username or password');
    req.user = Users_1.UserModel.toPublish(user);
    next();
}));
