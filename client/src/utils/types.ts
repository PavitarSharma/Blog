/* eslint-disable @typescript-eslint/no-explicit-any */
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
  content: [any]
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

export type TBlogActivity = {
  total_comments: number;
  total_likes: number;
  total_parent_comments: number;
  total_reads: number;
};

export type TBlogAuthor = {
  fullname: string;
  username: string;
  profile_img: string;
};

export type TGetBlog = {
  _id: string;
  blog_id: string;
  banner: string;
  des: string;
  tags: [string];
  content: unknown[];
  title: string;
  author: TBlogAuthor;
  activity: TBlogActivity;
  publishedAt: string;
};
