"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
class AuthenticationController {
    static login = (req, res) => {
        res.json(req.params);
    };
    static register = (req, res) => {
        const validatedData = req.body;
    };
    static logout = (req, res) => {
        res.send(req.params);
    };
}
exports.AuthenticationController = AuthenticationController;
