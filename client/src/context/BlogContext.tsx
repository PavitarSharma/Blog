import React, { createContext, useState } from "react";

interface BlogContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const BlogContext = createContext<BlogContextProps>({
  searchTerm: "",
  setSearchTerm: () => {},
});

const BlogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const contextValue: BlogContextProps = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

export default BlogContextProvider;
