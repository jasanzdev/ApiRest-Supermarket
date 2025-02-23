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
const Users_1 = require("../models/Users");
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const http_1 = require("../constants/http");
class UserController {
}
_a = UserController;
UserController.getAll = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    (0, appAssert_1.default)(role === 'ADMIN' || role === 'SUPERVISOR', http_1.UNAUTHORIZED, 'Access not Authorized');
    const users = yield Users_1.UserModel.getAll();
    res.status(http_1.OK).json(!users ? 'No users found' : users);
}));
UserController.delete = (0, catchErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    (0, appAssert_1.default)(role === 'ADMIN', http_1.UNAUTHORIZED, 'Access not Authorized');
    const { id } = req.params;
    yield Users_1.UserModel.delete(id);
    res.status(http_1.OK).send('User deleted successfully');
}));
exports.default = UserController;
