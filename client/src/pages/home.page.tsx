import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/InPageNavigation";
import { http } from "../http";
import Loader from "../components/Loader";
import BlogPostCard from "../components/BlogPostCard";
import { Blog, TrendingBlog } from "../utils/types";
import MinimalBlogPost from "../components/MinimalBlogPost";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [tendingBlogs, setTendingBlogs] = useState([]);

  const fetchLatestBlogs = async () => {
    try {
      const {
        data: { blogs },
      } = await http.get("/blogs/latest-blogs");
      setBlogs(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      const {
        data: { blogs },
      } = await http.get("/blogs/trending-blogs");
      setTendingBlogs(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
    fetchTrendingBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* Latest Blogs */}
        <div className="w-full">
          <InPageNavigation
            routes={["home", "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs &&
                blogs?.map((blog: Blog, i: number) => (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <BlogPostCard content={blog} author={blog?.author} />
                  </AnimationWrapper>
                ))
              )}
            </>

            <>
              {tendingBlogs?.length === 0 ? (
                <Loader />
              ) : (
                tendingBlogs &&
                tendingBlogs?.map((blog: TrendingBlog, i: number) => (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <MinimalBlogPost index={i} blog={blog} />
                  </AnimationWrapper>
                ))
              )}
            </>
          </InPageNavigation>
        </div>

        {/* Filters and trending blogs */}
      </section>
    </AnimationWrapper>
  );
};

export default Home;
