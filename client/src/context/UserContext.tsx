import React, { createContext, useEffect, useState } from "react";
import { lookInSession } from "../common/session";

export const UserContext = createContext({});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
