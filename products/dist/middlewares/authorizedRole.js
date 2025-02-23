"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedRole = void 0;
const AuthorizedRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.cookies.user.role)) {
            return res.status(401).json({ message: 'Access denied for this role' });
        }
        next();
    };
};
exports.AuthorizedRole = AuthorizedRole;
