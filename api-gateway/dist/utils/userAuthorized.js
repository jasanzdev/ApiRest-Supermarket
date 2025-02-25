"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedUser = void 0;
const AuthorizedUser = (user, proxyReq, res) => {
    if (user && (user.role === 'ADMIN' || user.role === 'SUPERVISOR')) {
        proxyReq.end();
    }
    else {
        res.status(401).json({
            "error": "Forbidden",
            "message": "You do not have the required privileges to perform this action."
        });
    }
};
exports.AuthorizedUser = AuthorizedUser;
