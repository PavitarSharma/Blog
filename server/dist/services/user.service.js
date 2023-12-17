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
exports.userService = void 0;
const models_1 = require("../models");
const http_errors_1 = __importDefault(require("http-errors"));
const uuid_1 = require("uuid");
class UserService {
    isUserExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield models_1.User.findOne({ email });
            return !!existingUser;
        });
    }
    generateUsername(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = email.split("@")[0];
            const isUsernameNotUnique = yield models_1.User.findOne({ username: username });
            isUsernameNotUnique ? (username += (0, uuid_1.v4)().substring(0, 5)) : "";
            return username;
        });
    }
    formatDatatoSend(user, access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                access_token,
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                profile_img: user.profile_img,
            };
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.isUserExist(body.email);
            if (userExists) {
                const error = (0, http_errors_1.default)(400, "User already exists");
                throw error;
            }
            const username = yield this.generateUsername(body.email);
            const newData = Object.assign(Object.assign({}, body), { username });
            return yield models_1.User.create(newData);
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.User.findById(id);
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map