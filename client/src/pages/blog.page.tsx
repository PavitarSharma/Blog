import { Link, useParams } from "react-router-dom";
import { http } from "../http";
import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/Loader";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import useBlogContext from "../hooks/useBlogContext";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { Blog } from "../utils/types";
import BlogPostCard from "../components/BlogPostCard";
import BlogContent from "../components/blog-content.component";

const BlogPage = () => {
  const { blog_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { setBlog, blog } = useBlogContext();
  const { data: similarBlogs = [] } = useSWR(
    `/blogs/latest-blogs?tag=${blog?.tags[0]}&eliminate_blog=${blog_id}`,
    fetcher
  );

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const { data } = await http.post("/blogs/get-blog", { blog_id });
      setBlog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog_id]);

  if (!blog) return null;

  const {
    title,
    des,
    banner,
    author: { fullname, username, profile_img },
    content,
    tags,
    publishedAt,
  } = blog;


  

  return (
    <AnimationWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-[900px] w-full center py-10 max-lg:px-[5vew]">
          <img src={banner} alt="banner" className="aspect-video rounded" />

          <div className="mt-12">
            <h2>{title}</h2>

            <div className="flex  max-sm:flex-col justify-between my-8">
              <div className="flex items-start gap-5">
                <img
                  src={profile_img}
                  alt="profile_img"
                  className="rounded-full w-12 h-12"
                />
                <p className="capitalize">
                  {fullname} <br /> @
                  <Link to={`/user/${username}`} className="underline ml-1">
                    {username}
                  </Link>
                </p>
              </div>

              <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                Published on {getDay(publishedAt)}
              </p>
            </div>
          </div>

          <BlogInteraction />

          {/* Blog Content */}
          <div className="my-12 font-gelasio blog-page-content">
            {
              content?.map((block, i) => (
                <div key={i} className="my-4 md:my-8">
                  <BlogContent block={block}  />
                </div>
              ))
            }
          </div>

          <BlogInteraction />

          {similarBlogs?.length > 0 ? (
            <>
              <h1 className="text-2xl mt-14 mb-10 font-medium">
                Similar Blogs
              </h1>

              {similarBlogs?.map((blog: Blog, i: number) => {
                return (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  >
                    <BlogPostCard content={blog} author={blog?.author} />
                  </AnimationWrapper>
                );
              })}
            </>
          ) : null}
        </div>
      )}
    </AnimationWrapper>
  );
};

export default BlogPage;
