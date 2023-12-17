import { Request, Response } from "express";
import { generateUploadURL } from "../utils/aws";

class BlogController {
  async generateUploadURL(req: Request, res: Response) {
    const uploadURL = await generateUploadURL(req.file);
    res.status(200).json({ uploadURL });
  }
}

export const blogController = new BlogController();
