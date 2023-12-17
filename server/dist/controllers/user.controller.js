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
exports.userController = void 0;
const services_1 = require("../services");
const http_errors_1 = __importDefault(require("http-errors"));
const auth_1 = require("firebase-admin/auth");
class UserController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const signupData = req.body;
            const { fullname, email, password } = signupData;
            if (!fullname || !email || !password)
                return next((0, http_errors_1.default)(400, "Insufficient fields provided. Please provide all required fields: (fullname, email, password)"));
            const hashPassword = yield services_1.authService.generateHashPassword(signupData.password);
            const userData = Object.assign(Object.assign({}, signupData), { password: hashPassword });
            try {
                const user = yield services_1.userService.createUser(userData);
                const acess_token = yield services_1.authService.generateSignature(user);
                const response = yield services_1.userService.formatDatatoSend(user, acess_token);
                res.status(201).json(response);
            }
            catch (error) {
                return next((0, http_errors_1.default)(500, error.message));
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginData = req.body;
            const { email, password } = loginData;
            if (!email || !password)
                return next((0, http_errors_1.default)(400, "Insufficient fields provided. Please provide all required fields: (email, password)"));
            const user = yield services_1.authService.signInUser(loginData);
            if (!user)
                return next((0, http_errors_1.default)(400, "Invalid credentials"));
            const access_token = yield services_1.authService.generateSignature(user);
            const response = yield services_1.userService.formatDatatoSend(user, access_token);
            res.status(200).json(response);
        });
    }
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken } = req.body;
            (0, auth_1.getAuth)()
                .verifyIdToken(accessToken)
                .then((decodedUser) => __awaiter(this, void 0, void 0, function* () {
                console.log(decodedUser);
                let { email, name, picture } = decodedUser;
                picture = picture === null || picture === void 0 ? void 0 : picture.replace("s96-c", "s384-c");
                // let user = await User.findOne({ email })
                //   .select("fullname, email, username profile_img google_auth")
                //   .then((u) => {
                //     return u || null;
                //   })
                //   .catch((error) => {
                //     return next(createHttpError(500, error.message));
                //   });
                // if (user) {
                //   if (!user.google_auth) {
                //     return next(
                //       createHttpError(
                //         400,
                //         "This email was signed  without hoogle. Please log on with passsword to access the account"
                //       )
                //     );
                //   } else {
                //     let username;
                //     if (email) {
                //       username = await userService.generateUsername(email);
                //     }
                //     const userData = {
                //       fullname: name,
                //       username,
                //       email,
                //       google_auth: true,
                //     };
                //     user = new User(userData);
                //     await user
                //       .save()
                //       .then((u) => {
                //         user = u;
                //       })
                //       .catch((error) => {
                //         return next(createHttpError(500, error.message));
                //       });
                //   }
                // }
                // if (user) {
                //   const acess_token = await authService.generateSignature(user);
                //   const response = await userService.formatDatatoSend(
                //     user,
                //     acess_token
                //   );
                //   res.status(200).json(response);
                // }
            }))
                .catch((error) => {
                return next((0, http_errors_1.default)(500, "Failed to authenticate you with google. Try with some other google account."));
            });
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    signOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield services_1.userService.findUser("");
            res.status(200).json(user);
        });
    }
    updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield services_1.userService.findUser("");
            res.status(200).json(user);
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
const userController = new UserController();
exports.userController = userController;
//# sourceMappingURL=user.controller.js.map