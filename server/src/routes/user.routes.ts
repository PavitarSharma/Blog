import express from "express";
import { userController } from "../controllers";
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/google-auth", userController.googleAuth);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password", userController.resetPassword);

// Authorized Routes - Need Authentication
router.get("/profile", userController.profile);
router.patch("/update-password", userController.updatePassword);
router.put("/profile", userController.updateProfile);
router.post("/signout", userController.signOut);

export { router as userRoutes };
