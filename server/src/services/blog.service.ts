import { IBlogBody } from "../dto";
import { Blog } from "../models";

class BlogService {
  private maxLimit = 5;

  get getLimit() {
    return this.maxLimit;
  }

  async createBlog(data: IBlogBody) {
    return await Blog.create(data);
  }

  async latestBlogs(
    page: number,
    tag: string,
    query: string,
    autherId: string
  ) {
    let findQuery: any = {};

    if (query) {
      findQuery.title = { $regex: new RegExp(query, "i") };
    }

    if (tag) {
      findQuery.tags = tag;
      findQuery.draft = false;
    } else {
      findQuery.draft = { $in: [true, false] };
    }


    if (autherId) {
      findQuery.author = autherId;
    }

    return await Blog.find(findQuery)
      .populate("author", "fullname username profile_img -_id")
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .limit(this.maxLimit * page);
  }

  async allLatestBlogsCount() {
    return await Blog.countDocuments({ draft: false });
  }

  async trendingBlogs() {
    return await Blog.find({ draft: false })
      .populate("author", "fullname username profile_img -_id")
      .sort({
        "activity.total_reads": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      })
      .select("blog_id title publishedAt  -_id")
      .limit(this.maxLimit);
  }

  async searchBlogs(tag: string) {
    const findQuery = { tags: tag, draft: false };
    return await Blog.find(findQuery)
      .populate("author", "fullname username profile_img -_id")
      .sort({
        "activity.total_reads": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .limit(this.maxLimit);
  }

  async searchBlogsCount(tag: string) {
    return await Blog.countDocuments({ tags: tag, draft: false });
  }
}

export const blogService = new BlogService();
