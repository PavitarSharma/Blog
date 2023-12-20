import { IBlogBody } from "../dto";
import { Blog } from "../models";

class BlogService {
  async createBlog(data: IBlogBody) {
    return await Blog.create(data);
  }

  async latestBlogs() {
    const maxLimit = 5;
    return await Blog.find({ draft: true })
      .populate("author", "fullname username profile_img -_id")
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .limit(maxLimit);
  }

  async trendingBlogs() {
    const maxLimit = 5;
    return await Blog.find({ draft: false })
      .populate("author", "fullname username profile_img -_id")
      .sort({
        "activity.total_reads": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      })
      .select("blog_id title publishedAt -_id")
      .limit(maxLimit);
  }
}

export const blogService = new BlogService();
