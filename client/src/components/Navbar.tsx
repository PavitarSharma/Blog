import { useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import UserNavigation from "./UserNavigation";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setuUserNavPanel] = useState(false);
  const { userAuth } = useUserContext();

  const handleUserNavPanek = () => {
    setuUserNavPanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setuUserNavPanel(false);
    }, 200);
  };

  return (
    <header className="navbar">
      <Link to="/">
        <img src="/imgs/logo.png" alt="logo" className="w-10" />
      </Link>

      <div
        className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto show ${
          searchBoxVisibility ? "show" : "hide"
        }`}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
        >
          <i className="fi fi-rr-search text-xl"></i>
        </button>

        <Link to="/editor" className="hidden md:flex gap-2  link">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        {userAuth?.access_token ? (
          <>
            <Link to="/dashboard/notification">
              <button className="bg-grey w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/10">
                <i className="fi fi-rr-bell"></i>
              </button>
            </Link>

            <div
              className="relative"
              onClick={handleUserNavPanek}
              onBlur={handleBlur}
            >
              <button className="w-12 h-12 mt-1">
                <img
                  src={userAuth?.profile_img}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
              {userNavPanel && <UserNavigation />}
            </div>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn-dark py-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn-light py-2 hidden md:block">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
