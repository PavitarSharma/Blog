import express from "express";
import { userController } from "../controllers";
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/google-auth", userController.googleAuth);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password", userController.resetPassword);

router.get("/search-users", userController.searchUsers);

router.get("/profile/:username", userController.profile);
// Authorized Routes - Need Authentication
router.patch("/update-password", userController.updatePassword);
router.put("/profile", userController.updateProfile);
router.post("/signout", userController.signOut);

export { router as userRoutes };
