import { IBlogBody } from "../dto";
import { Blog, User } from "../models";

class BlogService {
  private maxLimit = 5;

  get getLimit() {
    return this.maxLimit;
  }

  async createBlog(data: IBlogBody) {
    return await Blog.create(data);
  }

  async updateBlog(data: IBlogBody) {
    const { blog_id, title, banner, content, tags, des, draft } = data;
    return Blog.findOneAndUpdate(
      { blog_id },
      { title, banner, content, tags, des, draft: draft ? draft : false },
      { new: true }
    );
  }

  async latestBlogs(
    page: number,
    tag: string,
    query: string,
    autherId: string,
    eliminate_blog: string
  ) {
    let findQuery: any = {};

    if (query) {
      findQuery.title = { $regex: new RegExp(query, "i") };
    }

    if (tag) {
      findQuery.tags = tag;
      findQuery.draft = false;
      findQuery.blog_id = {
        $ne: eliminate_blog,
      };
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

  async getBlog(blog_id: string, mode: string, draft: boolean) {
    const incrementalVal = mode !== "edit" ? 1 : 0;
    const blog = await Blog.findOneAndUpdate(
      { blog_id },
      { $inc: { "activity.total_reads": incrementalVal } },
      { new: true }
    )
      .populate("author", "fullname username profile_img")
      .select("title des content banner activity publishAt blog_id tags");

    if (blog && blog.author instanceof User) {
      // Ensure that 'author' is an instance of 'User'
      await User.findOneAndUpdate(
        { username: blog.author.username },
        {
          $inc: { "account_info.total_reads": incrementalVal },
        },
        { new: true }
      );
    }

    if (blog?.draft && !draft) {
      {
        return new Error(" You can not access draft blog ");
      }
    }

    return blog;
  }
}

export const blogService = new BlogService();
