"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserCryptoPass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateUserCryptoPass = (userData) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(userData.password, 10, function (error, hash) {
            if (error) {
                console.log('Error CryptoPass', error);
                reject(error);
            }
            const newUser = {
                ...userData,
                hash
            };
            resolve(newUser);
        });
    });
};
exports.CreateUserCryptoPass = CreateUserCryptoPass;
