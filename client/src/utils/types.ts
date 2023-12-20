export type Blog = {
  activity: {
    total_likes: number;
    total_comments: number;
    total_reads: number;
    total_parent_comments: number;
  };
  blog_id: string;
  title: string;
  banner: string;
  des: string;
  tags: string[];
  author: {
    fullname: string;
    username: string;
    profile_img: string;
  };
  publishedAt: string;
};

export type TrendingBlog = {
  blog_id: string;
  title: string;
  author: {
    fullname: string;
    username: string;
    profile_img: string;
  };
  publishedAt: string;
};
