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
exports.AuthService = exports.authService = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    generateSignature(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const JWT_SECRET = process.env.SECRET_ACCESS_KEY;
            const payloadData = { id: payload._id };
            return jsonwebtoken_1.default.sign(payloadData, JWT_SECRET, { expiresIn: "7d" });
        });
    }
    generateHashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, 10);
        });
    }
    signInUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ email: body.email });
            if (!user) {
                return null; // User not found
            }
            if (user.google_auth) {
                throw new Error("Account was created using google. Try logging with google");
            }
            const isPasswordValid = yield user.comparePassword(body.password);
            if (!isPasswordValid) {
                return null; // Invalid password
            }
            return user;
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map