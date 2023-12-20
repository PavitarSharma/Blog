import express from "express";
import { blogController } from "../controllers";
import { upload } from "../middlewares/upload";
import { isAuthenticated } from "../middlewares";
const router = express.Router();

router.get("/latest-blogs", blogController.latestBlogs);
router.get("/trending-blogs", blogController.trendingBlogs);
router.post(
  "/get-upload-url",
  upload.single("banner"),
  blogController.generateUploadURL
);

router.post("/create-blog", isAuthenticated, blogController.createBlog);

export { router as blogRoutes };
