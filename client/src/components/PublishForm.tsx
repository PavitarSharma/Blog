import AnimationWrapper from "../common/page-animation";
import Tag from "./Tag";
import toast from "react-hot-toast";
import useEditorContext from "../hooks/useEditorContext";
import { http } from "../http";
import useUserContext from "../hooks/useUserContext";
import { useNavigate, useParams } from "react-router-dom";
import { blogStructure } from "../context/EditorContext";
import { AxiosError } from "axios";
import { handleApiError } from "../utils/handleApiError";

const PublishForm = () => {
  const characterLimit = 200;
  const tagLimit = 10;
  const { blog_id } = useParams();
  const navigate = useNavigate();
  const { setEditorState, blog, setBlog } = useEditorContext();
  const { userAuth } = useUserContext();

  const { banner, title, tags, des, content } = blog;

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;

    setBlog({
      ...blog,
      title: input.value,
    });
  };

  const handleBlogDesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const input = event.target;

    setBlog({
      ...blog,
      des: input.value,
    });
  };

  const handleTitleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const tag = (event.target as HTMLInputElement).value;

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({
            ...blog,
            tags: [...tags, tag],
          });
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags`);
      }

      (event.target as HTMLInputElement).value = "";
    }
  };

  const handlePublish = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const button = event.currentTarget as HTMLButtonElement;

    if (button.className.includes("disabled")) {
      return;
    }

    if (!title.length) {
      return toast.error("Write blog title before publishing");
    }

    if (!des.length || des.length > characterLimit) {
      return toast.error(
        `Write a description about your blog within ${characterLimit} characters to publish`
      );
    }

    if (!tags.length) {
      return toast.error("Enter at least 1 tag to help us rank you blog");
    }

    const loadingToast = toast.loading("Publishing....");

    button.classList.add("disabled");

    const blogObj = {
      title,
      banner,
      des,
      content,
      tags,
      draft: false,
    };

    try {
      await http.post(
        "/blogs/create-blog",
        { ...blogObj, id: blog_id },
        {
          headers: {
            Authorization: `Bearer ${userAuth?.access_token}`,
          },
        }
      );

      button.classList.remove("disabled");
      toast.dismiss(loadingToast);
      toast.success("Published 👍");
      setBlog(blogStructure);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
      button.classList.remove("disabled");
      toast.dismiss(loadingToast);

      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }
      toast.error(message);
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen GRID items-center lg:grid-cols-2 py-16 lg:gap-4">
        <button
          type="button"
          onClick={handleCloseEvent}
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] w-full center">
          <p className="text-dark-grey mb-1">Preview</p>

          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="banner" />
          </div>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>

          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            onChange={handleBlogTitleChange}
            defaultValue={title}
            className="input-box pl-4"
          />
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <textarea
            maxLength={characterLimit}
            defaultValue={des}
            onChange={handleBlogDesChange}
            onKeyDown={handleTitleKeyDown}
            className="h-40 resize-none leading-7 input-box pl-4"
          ></textarea>

          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des.length} characters left
          </p>

          <p className="text-dark-grey mb02 mt-9">
            Topics - (Helps is searching and ranking your blog post)
          </p>

          <div className="relative input-box !pl-2 !py-2 !pb-4">
            <input
              type="text"
              placeholder="Topic"
              onKeyDown={handleTagKeyDown}
              className="sticky input-box !bg-white top-0 left-0 !pl-4 !mb-3 !focus:bg-white"
            />

            {tags?.map((tag: string, i: number) => (
              <Tag key={i} tagIndex={i} tag={tag} />
            ))}
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right">
            {tagLimit - tags.length} tags left
          </p>

          <button className="btn-dark px-8" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
