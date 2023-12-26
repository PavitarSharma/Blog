import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/Loader";
import useUserContext from "../hooks/useUserContext";
import AboutUser from "../components/AboutUser";
import InPageNavigation, {
  InPageNavigationRef,
} from "../components/InPageNavigation";
import { useCallback, useEffect, useRef, useState } from "react";
import NoDataMessage from "../components/Nodata";
import BlogPostCard from "../components/BlogPostCard";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
import PageNotFound from "./404.page";

const UserProfilePage = () => {
  const { id: profileId } = useParams();
  const [page, setPage] = useState(1);
  const { data: user, isLoading } = useSWR(
    `/users/profile/${profileId}`,
    fetcher
  );

  const { data: blogs = [], isLoading: blogLoading } = useSWR(
    user ? `/blogs/latest-blogs?page=${page}&autherId=${user._id}` : null,
    fetcher
  );

  const inPageNavRef = useRef<InPageNavigationRef>(null);

  const { userAuth } = useUserContext();
  const handleLoadMore = useCallback(() => setPage((prev) => prev + 1), []);

  useEffect(() => {
    if (inPageNavRef.current) {
      inPageNavRef.current.triggerButtonClick();
    }
  }, []);

  return (
    <AnimationWrapper>
      {isLoading ? (
        <Loader />
      ) : user?.username?.length ? (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l md:border-l-grey md:sticky md:top-[100px] md:py-10">
            <img
              src={user?.profile_img}
              alt="profile_img"
              className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32"
            />

            <h1 className="text-2xl font-medium">@{user?.username}</h1>
            <p className="text-xl capitalize h-6">{user?.fullname}</p>
            <p>
              {user?.account_info?.total_posts.toLocaleString()} Blogs -{" "}
              {user?.account_info?.total_reads.toLocaleString()} Reads
            </p>

            <div className="flex gap-4 mt-2">
              {userAuth?.username === profileId && (
                <Link
                  to="/settings/edit-profile"
                  className="!rounded-md btn-light"
                >
                  Edit Profile
                </Link>
              )}
            </div>

            <AboutUser
              bio={user?.bio}
              social_links={user?.social_links}
              createdAt={user?.createdAt}
              className="max-md:hidden"
            />
          </div>

          <div className="max-md:mt-2 w-full">
            <InPageNavigation
              ref={inPageNavRef}
              routes={["Blog Published", "About"]}
              defaultHidden={["About"]}
            >
              <>
                {blogLoading ? (
                  <Loader />
                ) : blogs?.length === 0 ? (
                  <NoDataMessage message="No blogs published" />
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  blogs?.map((blog: any, i: number) => (
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

              <AboutUser
                bio={user?.bio}
                social_links={user?.social_links}
                createdAt={user?.createdAt}
              />
            </InPageNavigation>
          </div>
        </section>
      ) : (
        <PageNotFound />
      )}
    </AnimationWrapper>
  );
};

export default UserProfilePage;
