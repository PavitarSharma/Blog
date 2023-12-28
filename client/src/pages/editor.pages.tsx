import useUserContext from "../hooks/useUserContext";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

import useEditorContext from "../hooks/useEditorContext";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { http } from "../http";

const Editor = () => {
  const { blog_id } = useParams();
  const { userAuth } = useUserContext();
  const { editorState, setBlog } = useEditorContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }

    http
      .post("/blogs/get-blog", { draft: true, blog_id, mode: "edit" })
      .then(({ data }) => {
        setBlog(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        setLoading(false);
      });
  }, [blog_id, setBlog]);

  return (
    <>
      {userAuth?.access_token === null ? (
        <Navigate to="/signin" />
      ) : loading ? (
        <Loader />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </>
  );
};

export default Editor;
