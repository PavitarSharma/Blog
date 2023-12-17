import express from "express";
import { blogController } from "../controllers";
import { upload } from "../middlewares/upload";
const router = express.Router();

router.post(
  "/get-upload-url",
  upload.single("banner"),
  blogController.generateUploadURL
);

export { router as blogRoutes };
