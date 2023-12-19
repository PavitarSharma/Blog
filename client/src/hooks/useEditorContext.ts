import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

const useEditorContext = () => {
  return useContext(EditorContext);
};

export default useEditorContext;
