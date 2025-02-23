"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
const HandleError = (error, res) => {
    if (error instanceof Error) {
        res.status(500).json(error.message);
    }
    else {
        res.status(500).json('An unexpected server error occurred');
    }
};
exports.HandleError = HandleError;
