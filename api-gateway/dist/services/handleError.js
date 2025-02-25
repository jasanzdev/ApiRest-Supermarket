"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../middleware/authenticate");
const userAuthorized_1 = require("../utils/userAuthorized");
const logger_1 = __importDefault(require("../logger"));
class HandleError {
}
HandleError.authenticateError = (error, proxyReq, req, res) => {
    const { response } = error;
    logger_1.default.log('error', `Error Verifying Token - ${response === null || response === void 0 ? void 0 : response.data}`);
    if (!response) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
    const data = response.data;
    if (data && req.cookies.refresh_token) {
        if (data.errorCode === 'AccessTokenExpired') {
            authenticate_1.Authenticate.getNewAccessToken(req, res)
                .then(user => (0, userAuthorized_1.AuthorizedUser)(user, proxyReq, res))
                .catch(error => logger_1.default.log('error', `Error Get New Access Token : ${error.response.data}`));
        }
    }
    else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.default = HandleError;
