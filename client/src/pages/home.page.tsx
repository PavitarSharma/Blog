import React, { useCallback, useEffect, useRef, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation, {
  InPageNavigationRef,
} from "../components/InPageNavigation";
import Loader from "../components/Loader";
import BlogPostCard from "../components/BlogPostCard";
import { Blog, TrendingBlog } from "../utils/types";
import MinimalBlogPost from "../components/MinimalBlogPost";
import NoDataMessage from "../components/Nodata";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";

const Home = () => {
  const [page, setPage] = useState(1);
  const [pageState, setPageState] = useState("home");
  const { data: blogs = [], isLoading: loadingBlogs } = useSWR(
    `/blogs/latest-blogs?page=${page}&tag=${
      pageState !== "home" ? pageState : ""
    }`,
    fetcher
  );

  const { data, isLoading: loadingTrendingBlogs } = useSWR(
    "/blogs/trending-blogs",
    fetcher
  );

  const trendingBlogs = data ? data.blogs : null;
  const inPageNavRef = useRef<InPageNavigationRef>(null);

  const categories = [
    "programming",
    "hollywood",
    "travel",
    "film making",
    "cooking",
    "social media",
    "tech",
    "finances",
  ];

  const loadBlogByCategory = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const category = event.currentTarget.innerText.toLowerCase();

    if (pageState === category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };

  useEffect(() => {
    if (inPageNavRef.current) {
      inPageNavRef.current.triggerButtonClick();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState, trendingBlogs]);

  const handleLoadMore = useCallback(() => setPage((prev) => prev + 1), []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* Latest Blogs */}
        <div className="w-full">
          <InPageNavigation
            ref={inPageNavRef}
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {loadingBlogs ? (
                <Loader />
              ) : blogs?.length === 0 ? (
                <NoDataMessage message="No blogs published" />
              ) : (
                blogs?.map((blog: Blog, i: number) => (
                  <AnimationWrapper
                    key={i}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  >
                    <BlogPostCard content={blog} author={blog?.author} />
                  </AnimationWrapper>
                ))
              )}

              <div className="md:max-w-sm mx-auto">
                <LoadMoreDataBtn handleLoadMore={handleLoadMore} />
              </div>
            </>

            <>
              {loadingTrendingBlogs ? (
                <Loader />
              ) : trendingBlogs?.length === 0 ? (
                <NoDataMessage message="No trending blogs" />
              ) : (
                trendingBlogs.map((blog: TrendingBlog, i: number) => (
                  <MinimalBlogPost key={i} index={i} blog={blog} />
                ))
              )}
            </>
          </InPageNavigation>
        </div>

        {/* Filters and trending blogs */}

        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-l-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>

              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => (
                  <button
                    onClick={loadBlogByCategory}
                    key={i}
                    className={`tag ${
                      pageState === category ? "!bg-black text-white" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                Trending <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>

              {trendingBlogs?.length === 0 ? (
                <Loader />
              ) : (
                trendingBlogs &&
                trendingBlogs?.map((blog: TrendingBlog, i: number) => (
                  <MinimalBlogPost key={i} index={i} blog={blog} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Home;
