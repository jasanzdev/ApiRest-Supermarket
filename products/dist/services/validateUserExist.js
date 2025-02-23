"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.ValidateUsernameExist = exports.ValidateEmailExist = void 0;
const Users_1 = require("../models/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ValidateEmailExist = async (email) => {
    try {
        const user = await Users_1.UserModel.findBy({ column: 'email', value: email });
        return !user;
    }
    catch (error) {
        console.error("Error validating email existence:", error);
        throw new Error("Error validating email existence");
    }
};
exports.ValidateEmailExist = ValidateEmailExist;
const ValidateUsernameExist = async (username) => {
    try {
        const user = await Users_1.UserModel.findBy({ column: 'username', value: username });
        return !user;
    }
    catch (error) {
        console.error("Error validating username existence:", error);
        throw new Error("Error validating username existence");
    }
};
exports.ValidateUsernameExist = ValidateUsernameExist;
const validateLogin = async (login) => {
    const { username, password } = login.body;
    if (!username || !password) {
        throw new Error('The username && password is require');
    }
    const user = await Users_1.UserModel.findBy({ column: 'username', value: username });
    if (user) {
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid)
            throw new Error('Invalid password');
        return user;
    }
    throw new Error('User does not exist');
};
exports.validateLogin = validateLogin;
