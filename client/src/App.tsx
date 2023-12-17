import { Route, Routes } from "react-router-dom";

import Home from "./pages/home.page";
import UserAuthForm from "./pages/userAuthForm.page";
import UserContextProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import Editor from "./pages/editor.pages";
import HomeLayout from "./layout/HomeLayout";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<HomeLayout />}>
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </UserContextProvider>
  );
};

export default App;
