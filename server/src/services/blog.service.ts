import { IBlogBody } from "../dto";
import { Blog } from "../models";

class BlogService {
  async createBlog(data: IBlogBody) {
    return await Blog.create(data);
  }
}

export const blogService = new BlogService();
