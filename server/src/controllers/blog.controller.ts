import { NextFunction, Request, Response } from "express";
import { generateUploadURL } from "../utils/aws";
import { IBlogBody, ICreateBlogInputs } from "../dto";
import createHttpError from "http-errors";
import { blogService, userService } from "../services";
import { v4 as uuidv4 } from "uuid";

class BlogController {
  async generateUploadURL(req: Request, res: Response) {
    const uploadURL = await generateUploadURL(req.file);
    res.status(200).json({ uploadURL });
  }

  async createBlog(req: Request, res: Response, next: NextFunction) {
    const authorId = req.user;

    let { title, banner, content, tags, des, draft } = <ICreateBlogInputs>(
      req.body
    );

    if (!title) {
      return next(
        createHttpError(400, "You must provide a title to publish the blog")
      );
    }

    if (!draft) {
      if (!des.length || des.length > 200) {
        return next(
          createHttpError(
            400,
            "You must provide blog description under 200 characters"
          )
        );
      }

      if (!banner) {
        return next(
          createHttpError(400, "You must provide blog banner to publish it")
        );
      }

      if (!content?.length) {
        return next(
          createHttpError(400, "There must be some blog content to publish it")
        );
      }

      if (!tags?.length || tags?.length > 10) {
        return next(
          createHttpError(
            400,
            "Provide tags in order to publish the blog, Maximum 10"
          )
        );
      }
    }

    tags = tags.map((tag) => tag.toLowerCase());

    const blogId =
      title
        .replace(/[^a-zA-z+-9]/g, " ")
        .replace(/\s+/g, "-")
        .trim()
        .toLowerCase() + uuidv4();

    const blogData: any = {
      blog_id: blogId,
      title,
      banner,
      content,
      tags,
      des,
      draft: Boolean(draft),
      author: authorId,
    };

    const blog = await blogService.createBlog(blogData);

    const incrementVal = draft ? 0 : 1;

    await userService.addUserPost(authorId, blog._id, incrementVal);

    res.status(201).json({ id: blog.blog_id });
  }

  async latestBlogs(req: Request, res: Response, next: NextFunction) {
    const page = Number(req.query.page);
    const { tag, query, autherId } = req.query;

    const blogs = await blogService.latestBlogs(
      page,
      tag as string,
      query as string,
      autherId as string
    );
    res.status(200).json(blogs);
  }

  async allLatestBlogsCount(req: Request, res: Response) {
    const count = await blogService.allLatestBlogsCount();
    res.status(200).json({ totalDocs: count });
  }

  async trendingBlogs(req: Request, res: Response, next: NextFunction) {
    const blogs = await blogService.trendingBlogs();
    res.status(200).json({ blogs });
  }

  async searchBlogs(req: Request, res: Response, next: NextFunction) {
    const { tag } = req.body;
    const blogs = await blogService.searchBlogs(tag);

    res.status(200).json({ blogs });
  }

  

 
}

export const blogController = new BlogController();
