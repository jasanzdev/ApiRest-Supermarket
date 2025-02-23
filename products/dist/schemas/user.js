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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = validateUser;
const zod_1 = __importDefault(require("zod"));
const validateUser_1 = require("../services/validateUser");
const roles_1 = require("../constants/roles");
const UserSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).regex(/^(?=.*[a-zA-Z]).{3,50}$/, { message: 'The name must only have letters' }),
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6).max(12)
        .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@!#$.,/*&%+<>()]).{6,12}$/, { message: 'The password to have at least one especial character, letters and numbers' }),
    email: zod_1.default.string().email({ message: 'Invalid email format' }),
    role: zod_1.default.enum(roles_1.Roles)
}).superRefine((data, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const isUsernameUnique = yield (0, validateUser_1.ValidateUsernameExist)(data.username);
    if (!isUsernameUnique) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            path: ['username'],
            message: 'The username already exists',
        });
    }
    const isEmailUnique = yield (0, validateUser_1.ValidateEmailExist)(data.email);
    if (!isEmailUnique) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            path: ['email'],
            message: 'The email already exists',
        });
    }
}));
function validateUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield UserSchema.safeParseAsync(input);
        if (result.error) {
            throw result.error;
        }
        return result.data;
    });
}
