"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../middleware/authenticate");
const userAuthorized_1 = require("../utils/userAuthorized");
const methods_1 = require("../constants/methods");
const handleError_1 = __importDefault(require("./handleError"));
const logger_1 = __importDefault(require("../logger"));
class OnProxyReq {
}
OnProxyReq.proxyReqProducts = (proxyReq, req, res) => {
    logger_1.default.log('info', `Info Products: ${req.method} ${req.url}`);
    if (methods_1.MethodsRequireAuth.includes(req.method)) {
        authenticate_1.Authenticate.verifyToken(req, res)
            .then(user => (0, userAuthorized_1.AuthorizedUser)(user, proxyReq, res))
            .catch(error => handleError_1.default.authenticateError(error, proxyReq, req, res));
    }
};
exports.default = OnProxyReq;
