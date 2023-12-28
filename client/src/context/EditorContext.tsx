/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import EditorJs from "@editorjs/editorjs";

export const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: {},
};

export interface IBlog {
  title: string;
  banner: string;
  content: any[];
  tags: string[];
  des: string;
  author: any;
}

export interface IEditorContext {
  blog: IBlog;
  setBlog: Dispatch<SetStateAction<IBlog>>;
  editorState: string;
  setEditorState: (editorState: string) => void;
  textEditor: EditorJs | null;
  setTextEditor: React.Dispatch<React.SetStateAction<EditorJs | null>>;
}

export const EditorContext = createContext<IEditorContext>({
  blog: blogStructure,
  setBlog: () => {},
  editorState: "editor",
  setEditorState: () => {},
  textEditor: null,
  setTextEditor: () => {},
});

export const EditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [blog, setBlog] = useState<IBlog>(blogStructure);
  const [editorState, setEditorState] = useState<string>("editor");
  const [textEditor, setTextEditor] = useState<EditorJs | null>(null);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
