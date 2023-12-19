import useUserContext from "../hooks/useUserContext";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

import useEditorContext from "../hooks/useEditorContext";

const Editor = () => {
  const { userAuth } = useUserContext();
  const { editorState } = useEditorContext();

  return (
    <>
      {userAuth?.access_token === null ? (
        <Navigate to="/signin" />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </>
  );
};

export default Editor;
