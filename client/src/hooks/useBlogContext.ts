import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const useBlogContext = () => {
  return useContext(BlogContext);
};

export default useBlogContext;
