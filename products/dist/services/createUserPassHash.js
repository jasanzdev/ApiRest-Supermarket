"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserPassHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateUserPassHash = (user) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(user.password, salt);
    const newUSer = {
        ...user,
        password: hash
    };
    return newUSer;
};
exports.CreateUserPassHash = CreateUserPassHash;
