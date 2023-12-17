import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import React, { useContext, useEffect, useState } from "react";
import { uploadImage } from "../common/aws";
import toast from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./Tools";

const BlogEditor = () => {
  const { blog, setBlog, setEditorState, textEditor, setTextEditor } =
    useContext(EditorContext);

  const { title, banner, content } = blog;

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: content,
        placeholder: "Let's write an awesome story",
        tools: tools,
      })
    );
  }, [setTextEditor, content]);

  const handleBannerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    const loadingToast = toast.loading("Uploading...");
    const url = await uploadImage(file);
    if (url) {
      toast.dismiss(loadingToast);
      toast.success("Uploaded 👍");
      setBlog({
        ...blog,
        banner: url,
      });
    }
  };

  const handleTitleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({
      ...blog,
      title: input.value,
    });
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;

    img.src = "/imgs/blog-banner.png";
  };

  const handlePublishEvent = async () => {
    // if (!banner.length) {
    //   return toast.error("Upload a blog banner to publish it");
    // }

    // if (!title.length) {
    //   return toast.error("Write blog title to publish it.");
    // }

    if (textEditor.isReady) {
      const data = await textEditor.save();

      // if (data.block.length) {
      //   setBlog({
      //     ...blog,
      //     content: data,
      //   });
      //   setEditorState("publish");
      // } else {
      //   return toast.error("Write something in your blog to publish it");
      // }
      setEditorState("publish");
    }
    // setEditorState("publish");
  };

  return (
    <>
      <header className="navbar">
        <Link to="/">
          <img src="/imgs/logo.png" alt="logo" className="w-10" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1">
          {title.length ? title : "New Blog"}
        </p>

        <div className="flex items-center gap-4 ml-auto">
          <button
            type="button"
            onClick={handlePublishEvent}
            className="btn-dark !py-2"
          >
            Publish
          </button>
          <button type="button" className="btn-light !py-2">
            Save Draft
          </button>
        </div>
      </header>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label htmlFor="uploadBanner" className="">
                <img
                  src={banner}
                  alt="blog-banner"
                  className="z-20"
                  onError={handleImageError}
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  name="banner"
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              defaultValue={title}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
