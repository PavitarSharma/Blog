"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.userRoutes = router;
router.post("/signup", controllers_1.userController.signUp);
router.post("/signin", controllers_1.userController.signIn);
router.post("/google-auth", controllers_1.userController.googleAuth);
router.post("/forgot-password", controllers_1.userController.forgotPassword);
router.patch("/reset-password", controllers_1.userController.resetPassword);
// Authorized Routes - Need Authentication
router.get("/profile", controllers_1.userController.profile);
router.patch("/update-password", controllers_1.userController.updatePassword);
router.put("/profile", controllers_1.userController.updateProfile);
router.post("/signout", controllers_1.userController.signOut);
//# sourceMappingURL=user.routes.js.map