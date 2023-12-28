import { Link } from "react-router-dom";
import useBlogContext from "../hooks/useBlogContext";
import useUserContext from "../hooks/useUserContext";

const BlogInteraction = () => {
  const { blog, setBlog } = useBlogContext();
  const { userAuth } = useUserContext();

  if (!blog) return null;

  const {
    blog_id,
    title,
    activity: { total_likes, total_comments },
    author: { username },
  } = blog;
  return (
    <>
      <hr className="border-grey my-2" />

      <div className="flex gap-6 items-center justify-between">
        <div className="flex gap-6 items-center">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <i className="fi fi-rr-heart"></i>
          </button>
          <p className="text-xl text-dark-grey">{total_likes}</p>

          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <i className="fi fi-rr-comment-dots"></i>
          </button>
          <p className="text-xl text-dark-grey">{total_comments}</p>
        </div>

        <div className="flex items-center gap-6">
          {userAuth?.username === username && (
            <Link
              to={`/editor/${blog_id}`}
              className="underline hover:text-purple"
            >
              Edit
            </Link>
          )}
          <a
            href={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
            target="_blank"
          >
            <i className="fi fi-brands-twitter text-xl hover:text-twitter"></i>
          </a>
        </div>
      </div>

      <hr className="border-grey my-2" />
    </>
  );
};

export default BlogInteraction;
