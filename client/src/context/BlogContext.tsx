import React, { createContext, useState } from "react";
import { TGetBlog } from "../utils/types";

interface BlogContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  blog: TGetBlog | null;
  setBlog: React.Dispatch<React.SetStateAction<TGetBlog | null>>;
}

export const BlogContext = createContext<BlogContextProps>({
  searchTerm: "",
  setSearchTerm: () => {},
  blog: null,
  setBlog: () => {},
});

const BlogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blog, setBlog] = useState<TGetBlog | null>(null);

  const contextValue: BlogContextProps = {
    searchTerm,
    setSearchTerm,
    blog,
    setBlog,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

export default BlogContextProvider;
