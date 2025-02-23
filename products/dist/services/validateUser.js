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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUsernameExist = exports.ValidateEmailExist = void 0;
const Users_1 = require("../models/Users");
const ValidateEmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.UserModel.findBy({ column: 'email', value: email });
    return !user;
});
exports.ValidateEmailExist = ValidateEmailExist;
const ValidateUsernameExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.UserModel.findBy({ column: 'username', value: username });
    return !user;
});
exports.ValidateUsernameExist = ValidateUsernameExist;
