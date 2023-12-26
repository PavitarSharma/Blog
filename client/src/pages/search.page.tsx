import { useParams } from "react-router-dom";
import InPageNavigation, {
  InPageNavigationRef,
} from "../components/InPageNavigation";
import NoDataMessage from "../components/Nodata";
import BlogPostCard from "../components/BlogPostCard";
import AnimationWrapper from "../common/page-animation";
import { Blog } from "../utils/types";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
import { useCallback, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { fetcher } from "../utils/fetcher";
import Loader from "../components/Loader";
import useSWR from "swr";
import UserCard from "../components/UserCard";

const SearchPage = () => {
  const { query } = useParams();
  const [page, setPage] = useState(1);
  const debounceSearch = useDebounce(query);
  const { data: blogs = [], isLoading: loadingBlogs } = useSWR(
    `/blogs/latest-blogs?page=${page}&query=${debounceSearch}`,
    fetcher
  );
  const { data: users = [], isLoading: loadingUsers } = useSWR(
    `/users/search-users?query=${debounceSearch}`,
    fetcher
  );

  const inPageNavRef = useRef<InPageNavigationRef>(null);
  const handleLoadMore = useCallback(() => setPage((prev) => prev + 1), []);

  const UserCardWrapper = () => {
    return (
      <>
        {loadingUsers ? (
          <Loader />
        ) : users?.length === 0 ? (
          <NoDataMessage message="No user found" />
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          users?.map((user: any, i: number) => (
            <AnimationWrapper
              key={i}
              transition={{ duration: 1, delay: i * 0.08 }}
            >
              <UserCard user={user} />
            </AnimationWrapper>
          ))
        )}

        {blogs?.length > 5 && (
          <div className="md:max-w-sm mx-auto">
            <LoadMoreDataBtn handleLoadMore={handleLoadMore} />
          </div>
        )}
      </>
    );
  };

  return (
    <section className="h-cover flex justify-center gap-10">
      {/* Latest Blogs */}
      <div className="w-full">
        <InPageNavigation
          ref={inPageNavRef}
          routes={[`Search Results from "${query}"`, "Account Matched"]}
          defaultHidden={["Account Matched"]}
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

            {blogs?.length > 5 && (
              <div className="md:max-w-sm mx-auto">
                <LoadMoreDataBtn handleLoadMore={handleLoadMore} />
              </div>
            )}
          </>

          <>
            <UserCardWrapper />
          </>
        </InPageNavigation>
      </div>

      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-1 border-grey pl-8 pt-3 max-md:hidden">
        <h1 className="font-medium text-xl mb-8">
          User related to search <i className="fi fi-rr-user mt01"></i>{" "}
        </h1>

        <UserCardWrapper />
      </div>
    </section>
  );
};

export default SearchPage;
