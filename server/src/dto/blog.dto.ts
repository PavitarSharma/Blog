export interface ICreateBlogInputs {
  title: string;
  banner: string;
  content: any[];
  tags: string[];
  des: string;
  draft: boolean;
}

export interface IBlogBody {
  title: string;
  banner: string;
  content: any[];
  tags: string[];
  des: string;
  draft: boolean;
  blog_id: string;
  author: string;
}
