export interface ICreateBlogInputs {
  title: string;
  banner: string;
  content: any[];
  tags: string[];
  des: string;
  draft: boolean;
  id?: string
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
