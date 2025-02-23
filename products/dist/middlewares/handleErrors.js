"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
const zod_1 = require("zod");
const http_1 = require("../constants/http");
const appErrors_1 = __importDefault(require("../utils/appErrors"));
const codeSql_1 = require("../constants/codeSql");
const HandleAppError = (res, error) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    });
};
const HandleError = (error, req, res, next) => {
    console.log('Handle Error', error);
    if (error instanceof zod_1.ZodError) {
        res.status(http_1.BAD_REQUEST).json(error.flatten().fieldErrors);
        return;
    }
    if (error instanceof appErrors_1.default) {
        HandleAppError(res, error);
        return;
    }
    if (error.code && codeSql_1.SqlCodeError.includes(error.code)) {
        console.log(error.code);
        res.status(http_1.CONFLICT).json({
            message: error.detail,
            errorCode: error.code,
        });
        return;
    }
    res.status(http_1.INTERNAL_SERVER_ERROR).json('INternal Server Error');
    next();
};
exports.HandleError = HandleError;
exports.default = exports.HandleError;
