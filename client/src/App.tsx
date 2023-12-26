import { Route, Routes } from "react-router-dom";

import Home from "./pages/home.page";
import UserAuthForm from "./pages/userAuthForm.page";
import UserContextProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import Editor from "./pages/editor.pages";
import HomeLayout from "./layout/HomeLayout";
import { EditorContextProvider } from "./context/EditorContext";
import BlogContextProvider from "./context/BlogContext";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import UserProfilePage from "./pages/profile.page";

const App = () => {
  return (
    <UserContextProvider>
      <BlogContextProvider>
        <Routes>
          <Route
            path="/editor"
            element={
              <EditorContextProvider>
                <Editor />
              </EditorContextProvider>
            }
          />
          <Route path="/" element={<HomeLayout />}>
            <Route path="signin" element={<UserAuthForm type="sign-in" />} />
            <Route path="signup" element={<UserAuthForm type="sign-up" />} />
            <Route index element={<Home />} />
            <Route path="search/:query" element={<SearchPage />} />
            <Route path="user/:id" element={<UserProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </BlogContextProvider>
    </UserContextProvider>
  );
};

export default App;
