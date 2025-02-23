"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const postgres_1 = require("../config/postgres");
class SessionModel {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, userAgent } = data;
            const session = yield postgres_1.db.query(`INSERT INTO sessions (user_id, user_agent, expired_at) 
                VALUES ($1, $2, NOW() + INTERVAL '30 days')
                ON CONFLICT(user_id,user_agent) DO UPDATE
                SET expired_at = NOW() + INTERVAL '30 days' 
                RETURNING *`, [id, userAgent]);
            return session.rows[0];
        });
    }
    static getBy(id, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.db.query(`SELECT * FROM sessions 
            WHERE sessions.user_id = $1 AND sessions.user_agent = $2`, [id, userAgent]);
            return result.rowCount ? result.rows[0] : null;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postgres_1.db.query(`DELETE FROM sessions WHERE sessions.user_id = $1`, [id]);
        });
    }
}
exports.SessionModel = SessionModel;
;
